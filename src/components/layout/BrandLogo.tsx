import Image from "next/image";
import Link from "next/link";
import { appName } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  markClassName?: string;
  textClassName?: string;
  className?: string;
};

function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/logo-mark.svg"
      alt=""
      width={36}
      height={36}
      className={cn("h-9 w-9 shrink-0 rounded-xl shadow-[0_12px_26px_rgba(0,122,61,0.28)]", className)}
      aria-hidden="true"
    />
  );
}

export function BrandLogo({
  href = "/",
  markClassName,
  textClassName,
  className,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className={cn("font-bold text-primary", textClassName)}>{appName}</span>
    </Link>
  );
}
