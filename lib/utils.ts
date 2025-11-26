import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BOOK_COLORS = [
  "bg-red-600",
  "bg-rose-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-500",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-slate-600",
  "bg-zinc-600",
  "bg-neutral-600",
  "bg-stone-600",
];

export function getBookCoverColor(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BOOK_COLORS.length;
  return BOOK_COLORS[index];
}
