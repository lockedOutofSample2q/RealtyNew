import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

const tables = ["apartments", "lands", "houses"];

// Helper to replace all occurrences of brand/author keywords
function cleanText(text: string | null): string | null {
  if (!text) return text;
  let cleaned = text;
  // Replace RHMC (case-sensitive) with the full name
  cleaned = cleaned.replace(/\bRHMC\b/g, "Realty holding and management consultants");
  // Replace Amritpal Singh with full name
  cleaned = cleaned.replace(/\bAmritpal\s+Singh\b/gi, "Realty holding and management consultants");
  return cleaned;
}

// Helper to add price source citation
function addPriceSource(description: string): string {
  // Check if price source is already added
  if (description.includes("sourced from MagicBricks") || description.includes("sourced from 99acres") || description.includes("sourced from local site")) {
    return description;
  }

  // Find references to average pricing/locality averages in the text
  // e.g. "average is ₹8,500 per sq ft", "Sector 70 averages ₹6,600", etc.
  const avgRegex = /(average(?:s)?\s+(?:is\s+|of\s+)?(?:₹|Rs\.?)\s*[0-9,]+)/gi;
  if (avgRegex.test(description)) {
    // We insert it at the first occurrence of average pricing
    return description.replace(avgRegex, (match) => {
      return `${match} (Market pricing sourced from MagicBricks / 99acres, June 2026. Verify current rates before transacting.)`;
    });
  }

  // Fallback: If no match but per sq ft is mentioned
  const sqftRegex = /(\/\s*sq\s*\.?\s*ft|\bper\s+sq\s*\.?\s*ft)\b/gi;
  if (sqftRegex.test(description)) {
    return description.replace(sqftRegex, (match) => {
      return `${match} (Market pricing sourced from MagicBricks / 99acres, June 2026. Verify current rates before transacting.)`;
    });
  }

  return description;
}

async function runUpdate() {
  console.log("Starting YMYL database-wide compliance updates...");

  for (const table of tables) {
    console.log(`Processing table: ${table}...`);
    const { data: records, error: fetchError } = await supabase
      .from(table)
      .select("*");

    if (fetchError) {
      console.error(`Error fetching from ${table}:`, fetchError.message);
      continue;
    }

    console.log(`Found ${records?.length || 0} records in ${table}`);

    for (const record of records || []) {
      let isModified = false;
      const updates: any = {};

      // 1. Clean brand name / author name from all text fields
      const textFields = [
        "title",
        "meta_description",
        "og_title",
        "og_description",
        "building_name",
        "address",
        "transfer_trap_analysis",
        "lifestyle_tax_analysis",
        "payment_plan_notes",
        "utility_analysis",
      ];

      for (const field of textFields) {
        if (record[field]) {
          const cleaned = cleanText(record[field]);
          if (cleaned !== record[field]) {
            updates[field] = cleaned;
            isModified = true;
          }
        }
      }

      // 2. Handle Description
      if (record.description) {
        let desc = record.description;
        // Clean names
        desc = cleanText(desc) || "";

        // Add pricing source if missing
        desc = addPriceSource(desc);

        // Manage Author Attribution block
        const attributionText =
          "This listing has been researched and verified by Realty holding and management consultants. For current pricing and availability, contact Realty holding and management consultants directly. Prices and information last verified: June 2026.";

        if (!desc.includes("researched and verified by")) {
          desc = `${desc.trim()}\n\n${attributionText}`;
        } else {
          // Replace existing attribution to ensure correct wording and capitalization
          desc = desc.replace(
            /This listing has been researched and verified by[\s\S]+?last verified:[\s\S]+?\./g,
            attributionText
          );
          desc = desc.replace(
            /This listing has been researched and verified by[\s\S]+?directly\.?/g,
            attributionText
          );
        }

        if (desc !== record.description) {
          updates.description = desc;
          isModified = true;
        }
      }

      // 3. Handle Stamp Duty Warnings in transfer_trap_analysis & lifestyle_tax_analysis
      const taxWarning =
        "(verify current rates at the Punjab Revenue Department / igrs.punjab.gov.in before transacting — rates are subject to revision)";
      
      const taxFields = ["transfer_trap_analysis", "lifestyle_tax_analysis"];
      for (const field of taxFields) {
        const currentVal = updates[field] || record[field];
        if (currentVal && currentVal.toLowerCase().includes("stamp duty")) {
          if (!currentVal.includes("igrs.punjab.gov.in") && !currentVal.includes("subject to revision")) {
            // Find "stamp duty" and append warning
            const stampDutyRegex = /(stamp\s+duty)/gi;
            updates[field] = currentVal.replace(stampDutyRegex, (match: string) => `${match} ${taxWarning}`);
            isModified = true;
          }
        }
      }

      // 4. Handle LTV in payment_plan_notes
      const currentPayNotes = updates.payment_plan_notes || record.payment_plan_notes;
      if (currentPayNotes) {
        const hasLoanRef =
          currentPayNotes.toLowerCase().includes("loan") ||
          currentPayNotes.toLowerCase().includes("bank") ||
          currentPayNotes.toLowerCase().includes("ltv");
        if (hasLoanRef && !currentPayNotes.includes("assessed property value")) {
          const ltvWarning =
            "\n\nBanks typically sanction 75–80% of the assessed property value (subject to your income eligibility and the bank's own valuation — which may differ from the registered transaction value). Confirm the sanctioned amount in writing before paying token.";
          updates.payment_plan_notes = currentPayNotes.trim() + ltvWarning;
          isModified = true;
        }
      }

      // 5. Handle FAQs
      if (record.faqs && Array.isArray(record.faqs)) {
        let faqsModified = false;
        const updatedFaqs = record.faqs.map((faq: any) => {
          let cleanedQ = cleanText(faq.question) || faq.question;
          let cleanedA = cleanText(faq.answer) || faq.answer;

          const advisorySuffix = " — Realty holding and management consultants Advisory, Mohali.";
          if (!cleanedA.includes("Advisory, Mohali")) {
            cleanedA = cleanedA.trim();
            if (cleanedA.endsWith(".")) {
              cleanedA = cleanedA.substring(0, cleanedA.length - 1);
            }
            cleanedA = `${cleanedA}${advisorySuffix}`;
          }

          if (cleanedQ !== faq.question || cleanedA !== faq.answer) {
            faqsModified = true;
          }

          return {
            question: cleanedQ,
            answer: cleanedA,
          };
        });

        if (faqsModified) {
          updates.faqs = updatedFaqs;
          isModified = true;
        }
      }

      // 6. Handle Upcoming Infrastructure (clean text)
      if (record.upcoming_infrastructure && Array.isArray(record.upcoming_infrastructure)) {
        let infraModified = false;
        const updatedInfra = record.upcoming_infrastructure.map((item: string) => {
          const cleaned = cleanText(item) || item;
          if (cleaned !== item) {
            infraModified = true;
          }
          return cleaned;
        });

        if (infraModified) {
          updates.upcoming_infrastructure = updatedInfra;
          isModified = true;
        }
      }

      // 7. Handle Highlights (clean text)
      if (record.highlights && Array.isArray(record.highlights)) {
        let highlightsModified = false;
        const updatedHighlights = record.highlights.map((item: string) => {
          const cleaned = cleanText(item) || item;
          if (cleaned !== item) {
            highlightsModified = true;
          }
          return cleaned;
        });

        if (highlightsModified) {
          updates.highlights = updatedHighlights;
          isModified = true;
        }
      }

      // If changes were made, push to database
      if (isModified) {
        console.log(`Updating record: ${record.slug} in ${table}...`);
        const { error: updateError } = await supabase
          .from(table)
          .update(updates)
          .eq("id", record.id);

        if (updateError) {
          console.error(`Error updating ${record.slug} in ${table}:`, updateError.message);
        } else {
          console.log(`Successfully updated ${record.slug}`);
        }
      }
    }
  }

  console.log("Database YMYL compliance updates complete!");
}

runUpdate().catch(console.error);
