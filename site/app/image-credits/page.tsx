import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Sources and licences for photographs used on the HVT website.",
  alternates: { canonical: "/image-credits" },
};

export default function ImageCreditsPage() {
  const all = Object.values(images);
  const stock = all.filter((i) => i.source === "stock");
  const hvt = all.filter((i) => i.source === "hvt");

  return (
    <article className="container-x section-y">
      <p className="eyebrow text-amber-ink">Credits</p>
      <h1 className="mt-4 text-[2.2rem] font-semibold leading-tight md:text-[3rem]">Image credits</h1>
      <p className="mt-5 max-w-[46rem] text-[1.05rem] leading-relaxed text-ink/75">
        Project and service photographs on this website are HVT’s own, as published on hvt.co.za. A small number of
        illustrative images, labelled “Illustrative image” where they appear, are used under open licences and do not
        depict HVT projects.
      </p>

      <h2 className="mt-14 text-[1.5rem] font-semibold">Illustrative images</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {stock.map((img) => (
          <li key={img.src} className="flex gap-4 rounded-[1.25rem] border border-line bg-white/60 p-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="text-sm leading-relaxed">
              <p className="font-semibold text-ink">{img.caption.replace("Illustrative image: ", "")}</p>
              <p className="mt-1 text-ink/70">
                Photo: {img.credit!.author} ·{" "}
                {img.credit!.licenceUrl ? (
                  <a href={img.credit!.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    {img.credit!.licence}
                  </a>
                ) : (
                  img.credit!.licence
                )}
              </p>
              <a href={img.credit!.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-amber-ink underline">
                Source on Wikimedia Commons
              </a>
              {img.credit!.licence.startsWith("CC BY-SA") && (
                <p className="mt-1 text-xs text-slate">Resized and cropped for this website; adaptations are shared under the same licence.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-[1.5rem] font-semibold">HVT photographs</h2>
      <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm text-ink/75 md:grid-cols-2">
        {hvt.map((img) => (
          <li key={img.src}>
            {img.alt} <span className="text-slate">({img.caption.replace("HVT photograph: ", "")})</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
