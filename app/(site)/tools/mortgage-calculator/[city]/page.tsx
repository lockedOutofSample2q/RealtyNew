import { Metadata } from "next";
import CalculatorClient, { CalculatorProps } from "../CalculatorClient";

const CITY_DATA: Record<string, { name: string; title: string; desc: string; stampDutyMale: number; stampDutyFemale: number; regCap: number; altNames: string[] }> = {
  zirakpur: {
    name: "Zirakpur",
    title: "Home Loan & Plot EMI Calculator for Zirakpur (2026 Rates)",
    desc: "Calculate your EMI for flats and plots in Zirakpur. Includes Punjab stamp duty, registration, GST, and live local property matches.",
    stampDutyMale: 0.06,
    stampDutyFemale: 0.05,
    regCap: 50000,
    altNames: ["Zirakpur Home Loan EMI Calculator", "Zirakpur Plot Loan Calculator", "Mortgage Calculator Zirakpur Punjab", "Housing Loan Calculator Zirakpur"]
  },
  kharar: {
    name: "Kharar",
    title: "Kharar Home Loan & Plot EMI Calculator (2026 Rates)",
    desc: "Calculate your EMI for affordable housing and plots in Kharar. Includes accurate stamp duty, GST, and registration estimates.",
    stampDutyMale: 0.06,
    stampDutyFemale: 0.05,
    regCap: 50000,
    altNames: ["Kharar Home Loan Calculator", "Kharar Plot Loan EMI Calculator", "Housing Loan EMI Calculator Kharar", "Mortgage Calculator Kharar"]
  },
  panchkula: {
    name: "Panchkula",
    title: "Panchkula Home Loan & Plot EMI Calculator (2026)",
    desc: "Calculate your EMI for properties in Panchkula. Includes Haryana stamp duty rates, registration, and GST estimates.",
    stampDutyMale: 0.07, // Example Haryana rate
    stampDutyFemale: 0.05,
    regCap: 50000,
    altNames: ["Panchkula Home Loan Calculator", "Panchkula Plot Loan EMI Calculator", "Housing Loan Calculator Panchkula Haryana", "Mortgage Calculator Panchkula"]
  },
};

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = CITY_DATA[city];
  if (!data) return {};

  const url = `https://www.realtyconsultants.in/tools/mortgage-calculator/${city}`;

  return {
    title: `${data.title} | Realty Consultants`,
    description: data.desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: "Realty Holding & Management Consultants",
      title: data.title,
      description: data.desc,
      url: url,
      images: [{ url: "https://www.realtyconsultants.in/images/og-mortgage-calculator.jpg" }]
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.desc,
      images: ["https://www.realtyconsultants.in/images/og-mortgage-calculator.jpg"],
    }
  };
}

export default async function CityMortgageCalculatorPage({ params }: Props) {
  const { city } = await params;
  const data = CITY_DATA[city];

  if (!data) {
    return <div>City not found</div>;
  }

  const props: CalculatorProps = {
    title: data.title,
    defaultCity: data.name,
    stampDutyMale: data.stampDutyMale,
    stampDutyFemale: data.stampDutyFemale,
    registrationCap: data.regCap,
    introContent: (
      <>
        <p>
          Planning to buy a flat or plot in <strong>{data.name}</strong>? Use our free
          Home Loan EMI Calculator to estimate your monthly payments in seconds — no
          sign-up required.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>See hidden costs:</strong> Includes local stamp duty for {data.name}, registration, and GST.</li>
          <li><strong>Compare loan types:</strong> Switch between Home Loans, Plot Loans, and Construction options.</li>
          <li><strong>NRI Mortgage support:</strong> Estimate EMIs in INR, USD, or CAD based on current rates.</li>
        </ul>
        <p>
          Property prices in {data.name} vary widely. At the current
          base rate of 8.5%, a ₹50L loan over 20 years costs ₹43,391/month. Use the
          sliders below to find your number — then scroll down to see what that budget
          unlocks in {data.name}'s active real estate market.
        </p>
      </>
    )
  };

  const schema1 = {
    "@type": "WebApplication",
    "name": data.title,
    "alternateName": data.altNames,
    "url": `https://www.realtyconsultants.in/tools/mortgage-calculator/${city}`,
    "description": data.desc,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
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
        "name": "Mortgage Calculator",
        "item": "https://www.realtyconsultants.in/tools/mortgage-calculator"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": data.name,
        "item": `https://www.realtyconsultants.in/tools/mortgage-calculator/${city}`
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [schema1, schema3]
  };

  return (
    <>
      <h1 className="sr-only">{data.title}</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      <CalculatorClient {...props} />
    </>
  );
}