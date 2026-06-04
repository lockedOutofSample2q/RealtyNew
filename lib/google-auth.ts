// lib/google-auth.ts
// ============================================================
// GOOGLE OAUTH2 SERVICE ACCOUNT AUTHENTICATION UTILITY
// ============================================================
// Generates OAuth2 access tokens for Google APIs without
// external dependencies using Node's standard crypto module.
// ============================================================

import crypto from "crypto";

export interface GoogleServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// Convert object/string to base64url format
function base64url(source: Buffer | string): string {
  let encoded = typeof source === "string" 
    ? Buffer.from(source).toString("base64") 
    : source.toString("base64");
  return encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

let cachedToken: string | null = null;
let tokenExpiryTime = 0; // Epoch timestamp in ms

/**
 * Generates an OAuth2 access token for the specified scopes using the
 * configured service account JSON key credentials.
 */
export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const now = Date.now();
  
  // Return cached token if valid (with 2 minutes buffer)
  if (cachedToken && tokenExpiryTime > now + 120 * 1000) {
    return cachedToken;
  }

  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson || credentialsJson.trim() === "") {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not configured in environment variables");
  }

  let creds: GoogleServiceAccount;
  try {
    creds = JSON.parse(credentialsJson);
  } catch (err) {
    throw new Error(`Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!creds.client_email || !creds.private_key) {
    throw new Error("Invalid service account JSON: missing client_email or private_key");
  }

  // Create JWT header and claim set
  const iat = Math.floor(now / 1000);
  const exp = iat + 3600; // Token validity: 1 hour
  
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  
  const payload = {
    iss: creds.client_email,
    scope: scopes.join(" "),
    aud: creds.token_uri || "https://oauth2.googleapis.com/token",
    exp: exp,
    iat: iat
  };
  
  const segments = [
    base64url(JSON.stringify(header)),
    base64url(JSON.stringify(payload))
  ];
  
  const signInput = segments.join(".");
  
  // Sign assertion using private key with RS256
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signInput);
  
  // Replace escaped newlines if JSON is read from env variables
  const privateKey = creds.private_key.replace(/\\n/g, "\n");
  
  let signature: Buffer;
  try {
    signature = signer.sign(privateKey);
  } catch (err) {
    throw new Error(`RSA Signature generation failed. Please verify private_key format: ${err instanceof Error ? err.message : String(err)}`);
  }
  
  segments.push(base64url(signature));
  const jwt = segments.join(".");
  
  // Post assertion to token exchange endpoint
  const tokenUrl = creds.token_uri || "https://oauth2.googleapis.com/token";
  
  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API Server responded with status ${response.status} ${response.statusText}: ${errorText}`);
    }
    
    const data = await response.json();
    if (!data.access_token) {
      throw new Error(`Token exchange response did not contain access_token: ${JSON.stringify(data)}`);
    }
    
    cachedToken = data.access_token;
    tokenExpiryTime = now + (data.expires_in || 3600) * 1000;
    
    return cachedToken!;
  } catch (err) {
    throw new Error(`Google OAuth2 authentication failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}
