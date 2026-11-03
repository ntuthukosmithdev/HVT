"use client";

import { useRef, useState } from "react";
import { Check, Code2, Copy, Smartphone } from "lucide-react";
import {
  EMPTY_DETAILS,
  EXAMPLE_DETAILS,
  SIGNATURE_LOGO_PATH,
  buildSignatureHtml,
  buildSignatureText,
  isValidEmail,
  type SignatureDetails,
} from "@/lib/signature";
import { company } from "@/lib/site";

const STORAGE_KEY = "hvt-signature-v1";
const TEXT_FIELDS = ["name", "title", "dept", "email", "mobile", "direct"] as const;

function loadSaved(): SignatureDetails {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return saved ? { ...EMPTY_DETAILS, ...saved } : EMPTY_DETAILS;
  } catch {
    return EMPTY_DETAILS;
  }
}

type Status = { text: string; ok: boolean } | null;

const guides = [
  {
    id: "gmail",
    label: "Gmail (web)",
    steps: [
      <>Open Gmail in your browser, click the gear icon, then <b>See all settings</b>.</>,
      <>On the <b>General</b> tab, scroll to <b>Signature</b> and click <b>Create new</b>. Name it “HVT”.</>,
      <>Click in the signature box and paste with <kbd>Ctrl</kbd> + <kbd>V</kbd> (<kbd>⌘</kbd> + <kbd>V</kbd> on a Mac).</>,
      <>Under <b>Signature defaults</b>, choose “HVT” for <b>For new emails use</b> and <b>On reply/forward use</b>.</>,
      <>Scroll to the bottom of the page and click <b>Save Changes</b>.</>,
    ],
  },
  {
    id: "outlook",
    label: "Outlook (new & web)",
    steps: [
      <>Open <b>Settings</b> (gear icon), then <b>Accounts</b>, then <b>Signatures</b>.</>,
      <>Click <b>New signature</b>, name it “HVT” and paste into the box with <kbd>Ctrl</kbd> + <kbd>V</kbd>.</>,
      <>Set “HVT” as the default for <b>new messages</b> and <b>replies/forwards</b>.</>,
      <>Click <b>Save</b>.</>,
    ],
  },
  {
    id: "classic",
    label: "Outlook (classic desktop)",
    steps: [
      <>Go to <b>File</b>, then <b>Options</b>, then <b>Mail</b>, then <b>Signatures…</b>.</>,
      <>Click <b>New</b>, name it “HVT”, then paste into the editing box with <kbd>Ctrl</kbd> + <kbd>V</kbd>.</>,
      <>On the right, choose “HVT” for <b>New messages</b> and <b>Replies/forwards</b>.</>,
      <>Click <b>OK</b>, then <b>OK</b> again.</>,
    ],
  },
  {
    id: "phone",
    label: "Phone",
    steps: [
      <>Phone mail apps don’t keep logos or formatting, so use <b>Copy mobile version</b> above.</>,
      <><b>Gmail app:</b> menu, then <b>Settings</b>, then your account, then <b>Mobile signature</b>. Paste and tap <b>OK</b>.</>,
      <><b>iPhone Mail:</b> <b>Settings</b>, then <b>Apps</b>, then <b>Mail</b>, then <b>Signature</b>. Paste your text.</>,
      <><b>Outlook app:</b> <b>Settings</b>, then <b>Signature</b>. Paste your text.</>,
    ],
  },
];

const inputCls =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-slate/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4 focus:ring-amber/25";

export function SignatureTool() {
  const [details, setDetails] = useState<SignatureDetails>(loadSaved);
  const [status, setStatus] = useState<Status>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const [guide, setGuide] = useState(guides[0].id);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  const isExample = TEXT_FIELDS.every((k) => !details[k]);
  const shown = isExample ? { ...EXAMPLE_DETAILS, address: details.address, legal: details.legal, disclaimer: details.disclaimer } : details;
  const previewHtml = buildSignatureHtml(shown, SIGNATURE_LOGO_PATH);

  const emailInvalid = !!details.email && !isValidEmail(details.email);
  const emailNotHvt = !!details.email && !emailInvalid && !/@hvt\.co\.za$/i.test(details.email);
  const missing = [
    !details.name && "full name",
    !details.title && "job title",
    !details.email && "email address",
  ].filter(Boolean) as string[];

  function update<K extends keyof SignatureDetails>(key: K, value: SignatureDetails[K]) {
    const next = { ...details, [key]: value };
    setDetails(next);
    setStatus(null);
    setFallbackText(null);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: the tool still works, it just won't remember */
    }
  }

  function ready() {
    if (isExample) return fail("Enter your own details first. The preview is showing an example.");
    if (emailInvalid) return fail("Please check your email address, e.g. name.surname@hvt.co.za.");
    if (missing.length) return fail(`Please add your ${missing.join(", ")}.`);
    return true;
  }
  function fail(text: string) {
    setStatus({ text, ok: false });
    return false;
  }
  const done = (text: string) => setStatus({ text, ok: true });

  async function copySignature() {
    if (!ready()) return;
    setFallbackText(null);
    const html = buildSignatureHtml(details);
    const text = buildSignatureText(details);
    try {
      if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) throw new Error("no rich clipboard");
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      done("Signature copied. Paste it into your email signature settings.");
    } catch {
      // Older browsers: copy a rendered, off-screen copy of the signature.
      const box = document.createElement("div");
      box.style.cssText = "position:fixed;left:-9999px;top:0;background:#fff;";
      box.innerHTML = html;
      document.body.appendChild(box);
      const range = document.createRange();
      range.selectNodeContents(box);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      sel?.removeAllRanges();
      box.remove();
      if (ok) done("Signature copied. Paste it into your email signature settings.");
      else fail("Your browser blocked copying. Select the signature in the preview with your mouse, then press Ctrl + C.");
    }
  }

  async function copyText(text: string, message: string) {
    if (!ready()) return;
    try {
      await navigator.clipboard.writeText(text);
      setFallbackText(null);
      done(message);
    } catch {
      setFallbackText(text);
      fail("Couldn’t copy automatically. The text is selected below: press Ctrl + C (⌘ + C on a Mac).");
      requestAnimationFrame(() => fallbackRef.current?.select());
    }
  }

  function clear() {
    setDetails(EMPTY_DETAILS);
    setStatus(null);
    setFallbackText(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  const field = (key: (typeof TEXT_FIELDS)[number]) => ({
    id: `sig-${key}`,
    name: key,
    value: details[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(key, e.target.value),
  });

  const activeGuide = guides.find((g) => g.id === guide)!;

  return (
    <div className="grid gap-6">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        {/* Details form */}
        <section aria-labelledby="sig-details" className="rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
          <h2 id="sig-details" className="text-[1.2rem] font-semibold">Your details</h2>
          <p className="mt-1 text-sm text-slate">
            Only your own details change. The logo, colours and company details are set by HVT.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()} noValidate>
            <div>
              <label htmlFor="sig-name" className="mb-1.5 block text-sm font-semibold">Full name</label>
              <input {...field("name")} type="text" autoComplete="name" maxLength={60} placeholder="Your full name" className={`${inputCls} border-line`} />
            </div>
            <div>
              <label htmlFor="sig-title" className="mb-1.5 block text-sm font-semibold">Job title</label>
              <input {...field("title")} type="text" autoComplete="organization-title" maxLength={70} placeholder="e.g. Project Manager" className={`${inputCls} border-line`} />
            </div>
            <div>
              <label htmlFor="sig-dept" className="mb-1.5 block text-sm font-semibold">
                Department <span className="font-normal text-slate">(optional)</span>
              </label>
              <input {...field("dept")} type="text" maxLength={60} placeholder="e.g. Substation Services" className={`${inputCls} border-line`} />
            </div>
            <div>
              <label htmlFor="sig-email" className="mb-1.5 block text-sm font-semibold">Email address</label>
              <input
                {...field("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={80}
                placeholder="name.surname@hvt.co.za"
                aria-invalid={emailInvalid || undefined}
                aria-describedby="sig-email-msg"
                className={`${inputCls} ${emailInvalid ? "border-red-600" : "border-line"}`}
              />
              <p id="sig-email-msg" className={`mt-1.5 text-xs ${emailInvalid ? "font-semibold text-red-700" : "text-slate"}`}>
                {emailInvalid
                  ? "Check the email address, e.g. name.surname@hvt.co.za"
                  : emailNotHvt
                    ? "Tip: official signatures normally use an @hvt.co.za address."
                    : ""}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sig-mobile" className="mb-1.5 block text-sm font-semibold">
                  Mobile <span className="font-normal text-slate">(optional)</span>
                </label>
                <input {...field("mobile")} type="tel" autoComplete="tel" maxLength={24} placeholder="+27 82 000 0000" className={`${inputCls} border-line`} />
              </div>
              <div>
                <label htmlFor="sig-direct" className="mb-1.5 block text-sm font-semibold">
                  Direct line <span className="font-normal text-slate">(optional)</span>
                </label>
                <input {...field("direct")} type="tel" maxLength={24} placeholder="+27 11 316 0000" className={`${inputCls} border-line`} />
              </div>
            </div>
            <p className="-mt-1 text-xs text-slate">
              Leave the direct line empty to show the main office number, {company.contact.phone}.
            </p>

            <fieldset className="mt-1 grid gap-2.5 border-t border-line pt-4">
              <legend className="mb-2 text-sm font-semibold">Include</legend>
              {(
                [
                  ["address", "Head office address"],
                  ["legal", "Company registration line"],
                  ["disclaimer", "Confidentiality notice"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    id={`sig-${key}`}
                    type="checkbox"
                    checked={details[key]}
                    onChange={(e) => update(key, e.target.checked)}
                    className="size-4 accent-[var(--color-amber-deep)]"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <button type="button" onClick={clear} className="justify-self-start text-sm font-semibold text-amber-ink underline underline-offset-4">
              Clear my details
            </button>
          </form>
        </section>

        {/* Preview */}
        <section aria-labelledby="sig-preview" className="min-w-0 rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="sig-preview" className="text-[1.2rem] font-semibold">Preview</h2>
            {isExample && (
              <span className="rounded-full bg-amber-soft px-3 py-1 text-xs font-semibold text-amber-ink">
                Showing example details. Type yours on the left.
              </span>
            )}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-line shadow-[0_18px_40px_-28px_rgb(8_19_33/0.55)]">
            <div className="grid gap-1 border-b border-line bg-mist px-4 py-2.5 text-xs text-slate">
              <span><b className="font-semibold text-ink">To:</b> client@example.com</span>
              <span><b className="font-semibold text-ink">Subject:</b> Substation project enquiry</span>
            </div>
            <div className="overflow-x-auto bg-white px-5 py-6">
              <p className="mb-5 font-[Arial,Helvetica,sans-serif] text-sm text-[#3b4450]">Kind regards,</p>
              {/* Signature HTML is generated from escaped input in lib/signature.ts */}
              <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={copySignature} className="btn btn-primary">
              <span className="btn-label">Copy signature</span>
              <span className="btn-capsule" aria-hidden="true"><Copy size={18} /></span>
            </button>
            <button
              type="button"
              onClick={() => copyText(buildSignatureText(details), "Mobile version copied. Paste it into your phone’s signature setting.")}
              className="btn btn-ghost-light"
            >
              <span className="btn-label">Copy mobile version</span>
              <span className="btn-capsule" aria-hidden="true"><Smartphone size={18} /></span>
            </button>
            <button
              type="button"
              onClick={() => copyText(buildSignatureHtml(details), "HTML code copied, for email apps that ask for HTML.")}
              className="btn btn-ghost-light"
            >
              <span className="btn-label">Copy HTML code</span>
              <span className="btn-capsule" aria-hidden="true"><Code2 size={18} /></span>
            </button>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={`mt-3 flex min-h-6 items-center gap-2 text-sm font-semibold ${status?.ok ? "text-green-700" : "text-red-700"}`}
          >
            {status?.ok && <Check size={16} aria-hidden="true" />}
            {status?.text}
          </p>
          {fallbackText && (
            <textarea
              ref={fallbackRef}
              readOnly
              value={fallbackText}
              aria-label="Signature to copy manually"
              className="mt-2 min-h-32 w-full rounded-xl border border-line bg-mist p-3 font-mono text-xs"
            />
          )}
        </section>
      </div>

      {/* Setup guides */}
      <section aria-labelledby="sig-setup" className="rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
        <h2 id="sig-setup" className="text-[1.2rem] font-semibold">Add it to your email</h2>
        <p className="mt-1 text-sm text-slate">Click <b>Copy signature</b> first, then follow the steps for the app you use.</p>
        <div role="tablist" aria-label="Email app" className="mt-5 flex flex-wrap gap-2">
          {guides.map((g) => (
            <button
              key={g.id}
              role="tab"
              id={`tab-${g.id}`}
              aria-selected={guide === g.id}
              aria-controls={`panel-${g.id}`}
              tabIndex={guide === g.id ? 0 : -1}
              onClick={() => setGuide(g.id)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = guides.findIndex((x) => x.id === guide);
                const next = guides[(i + (e.key === "ArrowRight" ? 1 : guides.length - 1)) % guides.length];
                setGuide(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                guide === g.id ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${activeGuide.id}`} aria-labelledby={`tab-${activeGuide.id}`} className="mt-5">
          <ol className="grid max-w-[70ch] list-decimal gap-2 pl-5 text-[0.95rem] leading-relaxed marker:font-bold marker:text-amber-ink [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-b-2 [&_kbd]:border-line [&_kbd]:bg-mist [&_kbd]:px-1.5 [&_kbd]:text-[0.8em] [&_kbd]:font-semibold">
            {activeGuide.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
        <p className="mt-5 max-w-[75ch] text-sm text-slate">
          The HVT logo in your signature loads from the HVT website. If a recipient’s email app blocks images until they
          allow them, they’ll see the text “HVT High Voltage Technology” in its place.
        </p>
      </section>
    </div>
  );
}
