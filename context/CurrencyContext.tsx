"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "AED" | "USD" | "INR";

// Exchange rates relative to AED (base currency of all property prices)
export const FX: Record<Currency, number> = {
  AED: 1,
  USD: 0.272,
  INR: 22.67,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  AED: "AED",
  USD: "USD",
  INR: "INR",
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceAED: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "INR",
  setCurrency: () => {},
  formatPrice: (p) => `INR ${Math.round(p * 22.67).toLocaleString("en-IN")}`,
});

const STORAGE_KEY = "monte_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  // Hydrate from localStorage on mount
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

  function formatPrice(priceAED: number): string {
    if (!priceAED || priceAED <= 0) return "Price on Request";
    const converted = Math.round(priceAED * FX[currency]);
    const locale = currency === "INR" ? "en-IN" : "en-US";
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
    return `${CURRENCY_SYMBOLS[currency]} ${formatted}`;
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
