import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// cn = "class name" utility (merges Tailwind classes correctly)
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
