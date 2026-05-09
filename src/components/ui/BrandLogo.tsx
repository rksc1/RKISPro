import { Logo } from "@/components/ui/Logo";

type BrandLogoProps = {
  href?: string;
  variant?: "dark" | "light";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  compactOnMobile?: boolean;
};

export function BrandLogo({
  href = "/",
  variant = "dark",
  size = "md",
  compactOnMobile = false
}: BrandLogoProps) {
  return <Logo compactOnMobile={compactOnMobile} href={href} size={size} variant={variant} />;
}
