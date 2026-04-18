"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  price: number;
  className?: string;
}

export default function PropertyPriceInline({ price, className }: Props) {
  const { formatPrice } = useCurrency();
  return <p className={className}>{price > 0 ? formatPrice(price) : "Price on Request"}</p>;
}
