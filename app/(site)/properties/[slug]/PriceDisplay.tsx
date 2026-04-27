"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  price: number;
  price_max?: number;
  listingLabel: string;
}

export default function PriceDisplay({ price, price_max, listingLabel }: Props) {
  const { formatPrice } = useCurrency();
  
  let display = "Price on Request";
  if (price > 0) {
    if (price_max && price_max > price) {
      display = `${formatPrice(price)} - ${formatPrice(price_max)}`;
    } else {
      display = formatPrice(price);
    }
  }

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
