"use client";

import React, { useMemo } from "react";
import * as _jsx_runtime from "react/jsx-runtime";

const shimReactInternals = (reactInstance: any) => {
  if (!reactInstance) return;
  const internals =
    reactInstance.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    reactInstance.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    reactInstance.__SECRET_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  if (internals) {
    if (internals.A && !internals.A.getOwner) {
      internals.A.getOwner = () => null;
    } else if (!internals.A) {
      internals.A = { getOwner: () => null };
    }
  }
};

shimReactInternals(React);

interface MdxContentProps {
  code: string;
}

const getMDXComponent = (code: string, globals: Record<string, any> = {}) => {
  shimReactInternals(React);
  const customJsxRuntime = {
    ..._jsx_runtime,
    jsxDEV: (type: any, props: any, key: any) => {
      return (_jsx_runtime as any).jsx(type, props, key);
    },
  };
  const scope = { React, ReactDOM: {}, _jsx_runtime: customJsxRuntime, ...globals };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
};

const slugify = (text: any): string => {
  if (!text) return "";
  if (typeof text === "string") {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  if (Array.isArray(text)) {
    return text.map(slugify).join("-");
  }
  if (typeof text === "object" && text.props && text.props.children) {
    return slugify(text.props.children);
  }
  return "";
};

const components = {
  h2: (props: any) => {
    const id = props.id || slugify(props.children);
    return <h2 id={id} className="scroll-mt-32 font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-10 mb-4" {...props} />;
  },
  h3: (props: any) => {
    const id = props.id || slugify(props.children);
    return <h3 id={id} className="scroll-mt-32 font-serif text-xl sm:text-2xl font-semibold text-charcoal mt-8 mb-3" {...props} />;
  },
  table: (props: any) => (
    <div className="my-8 w-full overflow-hidden overflow-x-auto rounded-2xl border border-black/10 shadow-sm bg-white">
      <table className="w-full text-left border-collapse font-sans text-sm text-charcoal m-0 !mt-0 !mb-0" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-black/5 text-charcoal text-xs uppercase tracking-wider font-display font-bold border-b border-black/10 m-0 !mt-0 p-0" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="divide-y divide-black/5 bg-white font-sans text-sm text-black/80 m-0 p-0" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-gold/5 transition-colors" {...props} />
  ),
  th: (props: any) => (
    <th className="py-3.5 px-5 font-bold border-b border-black/10 text-charcoal bg-black/5" {...props} />
  ),
  td: (props: any) => (
    <td className="py-3.5 px-5 border-b border-black/5 align-top leading-relaxed first:font-semibold first:text-charcoal" {...props} />
  ),
};

export default function MdxContent({ code }: MdxContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
