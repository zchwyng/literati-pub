import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BOOK_COLORS = [
  "bg-red-900",
  "bg-rose-950",
  "bg-orange-900",
  "bg-amber-900",
  "bg-yellow-900",
  "bg-lime-900",
  "bg-green-900",
  "bg-emerald-950",
  "bg-teal-950",
  "bg-cyan-950",
  "bg-sky-950",
  "bg-blue-950",
  "bg-indigo-950",
  "bg-violet-950",
  "bg-purple-950",
  "bg-fuchsia-950",
  "bg-pink-950",
  "bg-slate-900",
  "bg-zinc-900",
  "bg-neutral-900",
  "bg-stone-900",
];

export function getBookCoverColor(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BOOK_COLORS.length;
  return BOOK_COLORS[index];
}
