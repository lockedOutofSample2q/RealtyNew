import { Metadata } from "next";
import CalculatorClient, { CalculatorProps } from "../../mortgage-calculator/CalculatorClient";

const BANK_DATA: Record<string, { name: string; title: string; desc: string; rate: number; processingFeePct: number; processingFeeCap: number; altNames: string[] }> = {
  sbi: {
    name: "SBI",
    title: "SBI Home Loan EMI Calculator (2026 Rates)",
    desc: "Calculate your State Bank of India (SBI) home loan EMI. Instantly see accurate 8.5% interest math, SBI processing fees, and hidden local property costs.",
    rate: 8.5,
    processingFeePct: 0.0035, // 0.35%
    processingFeeCap: 10000,
    altNames: ["State Bank of India Home Loan Calculator", "SBI Housing Loan EMI Calculator", "SBI Home Loan Calculator 2026", "SBI Plot Loan EMI Calculator"]
  },
  hdfc: {
    name: "HDFC",
    title: "HDFC Home Loan EMI Calculator (2026 Rates)",
    desc: "Calculate your HDFC home loan EMI. Built with current HDFC interest rates, processing fees, and local Punjab stamp duty rules.",
    rate: 8.75,
    processingFeePct: 0.005, // 0.5%
    processingFeeCap: 15000,
    altNames: ["HDFC Housing Loan EMI Calculator", "HDFC Home Loan Calculator 2026", "HDFC Plot Loan EMI Calculator", "HDFC Mortgage Calculator"]
  },
  icici: {
    name: "ICICI Bank",
    title: "ICICI Bank Home Loan EMI Calculator (2026)",
    desc: "Calculate your ICICI Bank home loan EMI. Plan your property budget with live 2026 ICICI rates and local registration costs.",
    rate: 8.9,
    processingFeePct: 0.005,
    processingFeeCap: Infinity,
    altNames: ["ICICI Home Loan EMI Calculator", "ICICI Housing Loan Calculator", "ICICI Bank Home Loan Calculator 2026", "ICICI Mortgage Calculator"]
  },
  pnb: {
    name: "PNB",
    title: "PNB Housing Loan EMI Calculator (2026)",
    desc: "Calculate your Punjab National Bank (PNB) home loan EMI. Accurate interest math, PNB processing fees, and Tricity property matches.",
    rate: 8.6,
    processingFeePct: 0.0035,
    processingFeeCap: 10000,
    altNames: ["Punjab National Bank Home Loan Calculator", "PNB Home Loan EMI Calculator", "PNB Housing Finance EMI Calculator", "PNB Plot Loan Calculator"]
  },
};

interface Props {
  params: Promise<{ bank: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BANK_DATA).map((bank) => ({ bank }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bank } = await params;
  const data = BANK_DATA[bank];
  if (!data) return {};

  const url = `https://www.realtyconsultants.in/tools/home-loan-calculator/${bank}`;

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

export default async function BankMortgageCalculatorPage({ params }: Props) {
  const { bank } = await params;
  const data = BANK_DATA[bank];

  if (!data) {
    return <div>Bank not found</div>;
  }

  const props: CalculatorProps = {
    title: data.title,
    defaultBank: data.name,
    defaultRate: data.rate,
    processingFeePct: data.processingFeePct,
    processingFeeCap: data.processingFeeCap,
    introContent: (
      <>
        <p>
          Applying for a home loan with <strong>{data.name}</strong>? Use our specialized {data.name} EMI Calculator to estimate your monthly payments with extreme accuracy.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Current 2026 {data.name} Rates:</strong> We've pre-loaded the calculator with {data.name}'s base rate of {data.rate.toFixed(2)}%.</li>
          <li><strong>Accurate Processing Fees:</strong> We calculate your upfront {data.name} bank fees using their exact fee structure.</li>
          <li><strong>True Cost to Buy:</strong> Unlike standard bank calculators, we also include state stamp duty, registration, and GST.</li>
        </ul>
        <p>
          Move the sliders below to see your exact EMI and hidden upfront costs. Once you know your number, scroll down to see which properties in Mohali match your {data.name} loan eligibility.
        </p>
      </>
    )
  };

  const schema1 = {
    "@type": "WebApplication",
    "name": data.title,
    "alternateName": data.altNames,
    "url": `https://www.realtyconsultants.in/tools/home-loan-calculator/${bank}`,
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
        "name": "Home Loan Calculators",
        "item": "https://www.realtyconsultants.in/tools/home-loan-calculator"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": data.name,
        "item": `https://www.realtyconsultants.in/tools/home-loan-calculator/${bank}`
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [schema1, schema3]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      <CalculatorClient {...props} />
    </>
  );
}