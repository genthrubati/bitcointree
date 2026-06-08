import clsx, { type ClassValue } from "clsx";

/** Tiny class-name combinator — keeps conditional Tailwind classes readable. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
