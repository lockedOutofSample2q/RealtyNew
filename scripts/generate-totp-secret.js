const OTPAuth = require("otpauth");

console.log("\n=========================================");
console.log("🔐 ADMIN LOGIN TOTP GENERATOR");
console.log("=========================================\n");

// Generate a random base32 secret
const secret = new OTPAuth.Secret({ size: 20 });

console.log("1. Add this exact string to your .env.local and Vercel Environment Variables:");
console.log("\n   ADMIN_TOTP_SECRET=" + secret.base32);

// Create the TOTP object to generate a URI
const totp = new OTPAuth.TOTP({
  issuer: "RealtyConsultants",
  label: "Admin",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: secret,
});

const uri = totp.toString();
const encodedUri = encodeURIComponent(uri);

console.log("\n\n2. Add this to your Google Authenticator or Authy App:");
console.log("\n   Option A: Enter the setup key manually:");
console.log("   Account Name: RealtyConsultants Admin");
console.log("   Your Key: " + secret.base32);
console.log("   Time based: Yes");

console.log("\n   Option B: Scan this QR Code:");
console.log("   https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodedUri);

console.log("\n\n3. How to access your login page:");
console.log("   Check your authenticator app for the 6-digit code, then go to:");
console.log("   https://www.realtyconsultants.in/admin-realty-8x2d9/login?key=YOUR_6_DIGIT_CODE\n");
