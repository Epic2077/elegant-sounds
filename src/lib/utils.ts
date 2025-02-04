import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { set } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formDataToObject<T extends Record<string, any>>(
  formData: FormData
): T {
  const obj: T = {} as T; // Important: Type assertion here

  for (const [key, value] of formData.entries()) {
    set(obj, key, value);
  }

  return obj;
}
