"use client";

import dynamic from "next/dynamic";

// Rendered in the browser only: the tool restores each person's saved details from
// localStorage, which doesn't exist during server rendering.
const SignatureTool = dynamic(() => import("./SignatureTool").then((m) => m.SignatureTool), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[28rem] place-items-center rounded-[1.5rem] border border-line bg-white text-sm text-slate">
      Loading the signature tool…
    </div>
  ),
});

export function SignatureLoader() {
  return <SignatureTool />;
}
