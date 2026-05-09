import Image from "next/image";

const markSizes = {
  sm: "size-9",
  md: "size-10",
  lg: "size-12"
};

export function LogoMark({
  size = "md",
  className = ""
}: {
  size?: keyof typeof markSizes;
  className?: string;
}) {
  return (
    <span className={`inline-grid shrink-0 place-items-center overflow-hidden rounded-xl ${markSizes[size]} ${className}`}>
      <Image
        alt="RKISPro logo mark"
        className="h-full w-full object-contain"
        height={48}
        src="/logo/icon.png"
        width={48}
      />
    </span>
  );
}
