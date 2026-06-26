import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Wraps every character in a span.char for GSAP split-text animations. */
export function splitTextToChars(text: string): string {
  return text
    .split('')
    .map((char) => (char === ' ' ? `<span class="char">&nbsp;</span>` : `<span class="char">${char}</span>`))
    .join('')
}
