import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const logoSizes = {
  sm: "h-9 w-[115px] sm:h-10 sm:w-[128px]",
  md: "h-10 w-[128px] sm:h-11 sm:w-[141px]",
  lg: "h-11 w-[141px] sm:h-12 sm:w-[154px]"
};

const markOnlySizes = {
  sm: "sm",
  md: "md",
  lg: "lg"
} as const;

type LogoProps = {
  href?: string;
  variant?: "dark" | "light";
  size?: keyof typeof logoSizes;
  markOnly?: boolean;
  compactOnMobile?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  href = "/",
  variant = "dark",
  size = "md",
  markOnly = false,
  compactOnMobile = false,
  className = "",
  priority = false
}: LogoProps) {
  const src = variant === "light" ? "/logo/logo-light.svg" : "/logo/logo-dark.svg";
  const focusClass =
    "rounded-xl outline-none transition duration-300 hover:scale-[1.03] hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const content = markOnly ? (
    <LogoMark size={markOnlySizes[size]} />
  ) : (
    <>
      {compactOnMobile ? (
        <span className="sm:hidden">
          <LogoMark size={markOnlySizes[size]} />
        </span>
      ) : null}
      <Image
        alt="RKISPro Industrial Marketplace"
        className={`${compactOnMobile ? "hidden sm:block" : "block"} ${logoSizes[size]} object-contain`}
        height={72}
        priority={priority}
        src={src}
        width={230}
      />
    </>
  );

  return (
    <Link aria-label="RKISPro home" className={`inline-flex items-center ${focusClass} ${className}`} href={href}>
      {content}
    </Link>
  );
}
