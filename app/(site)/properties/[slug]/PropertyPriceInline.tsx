"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  priceAED: number;
  className?: string;
}

export default function PropertyPriceInline({ priceAED, className }: Props) {
  const { formatPrice } = useCurrency();
  return <p className={className}>{priceAED > 0 ? formatPrice(priceAED) : "Price on Request"}</p>;
}
