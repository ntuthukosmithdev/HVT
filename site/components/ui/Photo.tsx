import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Show the provenance label (HVT photograph / illustrative image) */
  label?: boolean;
  labelPosition?: "top-left" | "bottom-left" | "bottom-right" | "top-right";
  reveal?: boolean;
};

const positions = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

/**
 * Fills its (relatively positioned) parent with a cover-cropped image.
 * Illustrative stock is always labelled so it is never mistaken for HVT work.
 */
export function Photo({
  image,
  sizes,
  className = "",
  imgClassName = "",
  priority,
  label = image.source === "stock",
  labelPosition = "bottom-right",
  reveal = false,
}: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} {...(reveal ? { "data-reveal-image": "" } : {})}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
      {label && (
        <span
          className={`absolute z-[3] ${positions[labelPosition]} rounded-full bg-navy-950/60 px-3 py-1 text-[0.68rem] font-medium tracking-wide text-white/85 backdrop-blur-sm`}
        >
          {image.source === "stock" ? "Illustrative image" : image.caption.replace("HVT photograph: ", "HVT · ")}
        </span>
      )}
    </div>
  );
}
