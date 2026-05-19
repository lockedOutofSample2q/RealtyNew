"use client";
import React, { createContext, useContext, useState } from "react";

type HeaderContextType = {
  isTransparentOverride: boolean | null;
  setTransparentOverride: (val: boolean | null) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  isTransparentOverride: null,
  setTransparentOverride: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [isTransparentOverride, setTransparentOverride] = useState<boolean | null>(null);
  return (
    <HeaderContext.Provider value={{ isTransparentOverride, setTransparentOverride }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);
