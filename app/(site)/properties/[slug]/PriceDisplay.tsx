"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  price: number;
  listingLabel: string;
}

export default function PriceDisplay({ price, listingLabel }: Props) {
  const { formatPrice } = useCurrency();
  const display = price > 0 ? formatPrice(price) : "Price on Request";

  return (
    <div className="p-5 border-b border-black/8">
      <p className="text-[20px] font-bold text-black mb-0.5">{display}</p>
      <p className="text-[11px] text-black/40 mb-1">{listingLabel}</p>
      {price === 0 && (
        <p className="text-[12px] text-black/40">Contact us for pricing information</p>
      )}
    </div>
  );
}
