import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "colour" | "white";
  className?: string;
  priority?: boolean;
};

/** Primary horizontal HVT logo (supplied artwork, cropped to its content box). */
export function Logo({ variant = "colour", className = "h-11 w-auto", priority }: Props) {
  return (
    <Link href="/" aria-label="HVT, High Voltage Technology: home" className="inline-flex shrink-0 items-center">
      <Image
        src={variant === "white" ? "/brand/hvt-logo-white.svg" : "/brand/hvt-logo-colour.svg"}
        alt="HVT High Voltage Technology"
        width={674}
        height={222}
        priority={priority}
        className={className}
        unoptimized
      />
    </Link>
  );
}
