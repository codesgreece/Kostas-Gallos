import Image from "next/image";

type BrandLogoProps = {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function BrandLogo({
  alt,
  className = "",
  priority = false,
  sizes = "80px",
}: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={320}
      height={320}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-auto max-w-none select-none ${className}`}
    />
  );
}
