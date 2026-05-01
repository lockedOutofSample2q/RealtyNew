"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxContentProps {
  code: string;
}

export default function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);

  return <Component />;
}
