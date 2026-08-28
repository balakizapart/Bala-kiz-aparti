import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 27 Ağustos 2026 */
export function formatDate(d: string | Date | null | undefined, locale = "tr-TR") {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}
