import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  /** The emphasised first part of the heading */
  title: ReactNode;
  /** The quieter continuation, rendered at reduced opacity (the reference's two-tone heading) */
  muted?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  md: "text-[1.75rem] md:text-[2.25rem] lg:text-[2.6rem]",
  lg: "text-[2rem] md:text-[2.75rem] lg:text-[3.25rem]",
  xl: "text-[2.5rem] md:text-[3.75rem] lg:text-[4.75rem]",
};

export function SectionHeading({
  eyebrow,
  title,
  muted,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  size = "lg",
  className = "",
}: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`} data-reveal>
      {eyebrow && (
        <p
          className={`eyebrow mb-5 flex items-center gap-3 ${center ? "justify-center" : ""} ${
            tone === "dark" ? "text-amber" : "text-amber-ink"
          }`}
        >
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={`${sizes[size]} font-semibold leading-[1.08] ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        {title}
        {muted && (
          <>
            {" "}
            <span className="opacity-55">{muted}</span>
          </>
        )}
      </Tag>
    </div>
  );
}
