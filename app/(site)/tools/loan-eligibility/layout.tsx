import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Eligibility Checker | Mohali Home Loan Calculator",
  description: "Check your home loan eligibility instantly. Calculate eligible loan amount based on income, EMIs, tenure, and interest rates for Mohali properties.",
  keywords: ["loan eligibility", "home loan calculator", "mohali real estate", "housing loan", "realty holding and management consultants mohali"],
  alternates: {
    canonical: "https://www.realtyconsultants.in/tools/loan-eligibility",
  },
};

export default function LoanEligibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
