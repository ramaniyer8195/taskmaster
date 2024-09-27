import { Note, Todo } from "@/interfaces/api";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNote = (item: Note | Todo): item is Note => {
  if (item.type === "note") return true;
  return false;
};
