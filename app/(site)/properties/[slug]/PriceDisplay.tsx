"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  priceAED: number;
  listingLabel: string;
}

export default function PriceDisplay({ priceAED, listingLabel }: Props) {
  const { formatPrice } = useCurrency();
  const display = priceAED > 0 ? formatPrice(priceAED) : "Price on Request";

  return (
    <div className="p-5 border-b border-black/8">
      <p className="text-[20px] font-bold text-black mb-0.5">{display}</p>
      <p className="text-[11px] text-black/40 mb-1">{listingLabel}</p>
      {priceAED === 0 && (
        <p className="text-[12px] text-black/40">Contact us for pricing information</p>
      )}
    </div>
  );
}
