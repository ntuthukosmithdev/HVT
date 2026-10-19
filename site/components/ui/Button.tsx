import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost-dark" | "ghost-light" | "dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: LucideIcon;
  className?: string;
  ariaLabel?: string;
};

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/** Pill button: a label plus an outlined arrow capsule, with a colour sweep on hover. */
export function ButtonLink({ href, children, variant = "primary", icon: Icon = ArrowRight, className = "", ariaLabel }: Props) {
  const content = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-capsule" aria-hidden="true">
        <Icon size={18} strokeWidth={2} />
      </span>
    </>
  );
  const cls = `btn btn-${variant} ${className}`;

  if (isInternal(href)) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
