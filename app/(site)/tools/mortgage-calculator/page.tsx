import { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Home Loan & Plot EMI Calculator (2026 Rates) | Mohali & Tricity | Realty Consultants",
  description: "Free EMI calculator for Mohali & Tricity home loans and plot loans. Get your monthly instalment, hidden costs (stamp duty, GST), and see what properties match your budget right now.",
  alternates: {
    canonical: "https://www.realtyconsultants.in/tools/mortgage-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Realty Holding & Management Consultants",
    title: "Home Loan & Plot EMI Calculator — Mohali & Tricity (2026)",
    description: "Calculate your EMI in seconds. Includes hidden costs: Punjab stamp duty, GST, registration. Built for Mohali & Tricity buyers and NRI investors.",
    url: "https://www.realtyconsultants.in/tools/mortgage-calculator",
    images: [{ url: "https://www.realtyconsultants.in/images/og-mortgage-calculator.jpg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan & Plot EMI Calculator — Mohali & Tricity (2026)",
    description: "Calculate your EMI in seconds. Includes hidden costs: Punjab stamp duty, GST, registration. Built for Mohali & Tricity buyers and NRI investors.",
    images: ["https://www.realtyconsultants.in/images/og-mortgage-calculator.jpg"],
  }
};

export default function MortgageCalculatorPage() {
  const schema1 = {
    "@type": "WebApplication",
    "name": "Home Loan & Plot EMI Calculator — Mohali & Tricity",
    "alternateName": [
      "Mohali Home Loan EMI Calculator",
      "Tricity Mortgage Calculator",
      "Plot Loan EMI Calculator Punjab",
      "SAS Nagar Housing Loan Calculator"
    ],
    "url": "https://www.realtyconsultants.in/tools/mortgage-calculator",
    "description": "Free EMI calculator for Mohali and Tricity home loans and plot loans. Calculate monthly payments, Punjab stamp duty, hidden costs, and amortisation schedule. Supports NRI mortgage modes in INR, USD, and CAD.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "featureList": [
      "Home loan EMI calculation",
      "Plot loan EMI calculation",
      "NRI mortgage mode (INR, USD, CAD)",
      "Punjab stamp duty calculator",
      "Hidden cost breakdown",
      "Full amortisation schedule",
      "Bank rate comparison (SBI, HDFC, PNB, ICICI)"
    ],
    "provider": {
      "@type": "LocalBusiness",
      "name": "Realty Holding & Management Consultants",
      "url": "https://www.realtyconsultants.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Phase 8A, E328, Industrial Area, Sector 75",
        "addressLocality": "Sahibzada Ajit Singh Nagar",
        "addressRegion": "Punjab",
        "postalCode": "160055",
        "addressCountry": "IN"
      },
      "telephone": "+917814613916"
    }
  };

  const schema2 = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the current home loan interest rate in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As of 2026, home loan interest rates in Mohali range from 8.5% to 9.5% depending on your lender and CIBIL score. SBI currently offers 8.5% for salaried borrowers with a score above 750. HDFC starts at 8.75%, PNB at 8.6%, and ICICI at 8.9%. Plot loans carry a premium of 0.5%–1% above home loan rates and have a maximum tenure of 15 years."
        }
      },
      {
        "@type": "Question",
        "name": "What is the EMI for a 50 lakh home loan in Punjab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At 8.5% interest over 20 years, the EMI for a ₹50 lakh home loan is approximately ₹43,391 per month. Over 15 years at the same rate, the EMI rises to ₹49,238/month but you save ₹14.3 lakh in total interest."
        }
      },
      {
        "@type": "Question",
        "name": "How much down payment do I need for a flat in SAS Nagar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RBI norms mandate a minimum down payment of 10%–25% depending on loan size. For loans above ₹75 lakh, banks require at least 25% down. For a ₹1 crore flat in Mohali, budget ₹30–35 lakh total upfront including stamp duty and registration."
        }
      },
      {
        "@type": "Question",
        "name": "Can NRIs get home loans for property in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. NRIs and PIOs can obtain home loans from Indian banks for property in Mohali. HDFC, SBI NRI, and ICICI all offer NRI home loan products with LTV ratios up to 80%. Repayment must be made through NRE or NRO accounts. Our calculator includes an NRI mode supporting USD and CAD currencies."
        }
      },
      {
        "@type": "Question",
        "name": "What are the property registration charges in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Punjab, stamp duty is 6% of property value for male buyers and 5% for female buyers or joint registrations. Registration charges are 1%, capped at ₹50,000. For a ₹1 crore flat, this is ₹6.5 lakh payable at the time of registry."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a home loan and a plot loan in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A home loan is for purchasing a built property. A plot loan is for purchasing residential land. Plot loans carry rates 0.5%–1% higher than home loans and have a maximum tenure of 15 years versus 30 for home loans. LTV on plot loans is typically 70%–75%."
        }
      }
    ]
  };

  const schema3 = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.realtyconsultants.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Free Tools",
        "item": "https://www.realtyconsultants.in/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Home Loan & Plot EMI Calculator",
        "item": "https://www.realtyconsultants.in/tools/mortgage-calculator"
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [schema1, schema2, schema3]
  };

  return (
    <>
      <h1 className="sr-only">Home Loan & Mortgage EMI Calculator for Mohali Real Estate</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      <CalculatorClient />
    </>
  );
}