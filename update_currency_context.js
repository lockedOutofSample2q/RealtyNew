const fs = require('fs');

const contextCode = `"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "INR" | "USD" | "CAD" | "AUD";

// Exchange rates relative to INR (base currency)
export const FX: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  CAD: 0.016,
  AUD: 0.018,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: "INR",
  USD: "USD",
  CAD: "CAD",
  AUD: "AUD",
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "INR",
  setCurrency: () => {},
  formatPrice: (p) => "INR " + Math.round(p).toLocaleString("en-IN"),
});

const STORAGE_KEY = "monte_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (stored && stored in FX) {
      setCurrencyState(stored);
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  }

  function formatPrice(price: number): string {
    if (!price || price <= 0) return "Price on Request";
    const converted = Math.round(price * FX[currency]);
    const locale = currency === "INR" ? "en-IN" : "en-US";
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
    
    return CURRENCY_SYMBOLS[currency] + " " + formatted;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
`;

fs.writeFileSync('context/CurrencyContext.tsx', contextCode, 'utf8');
