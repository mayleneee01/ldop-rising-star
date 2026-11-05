/**
 * Helper utility to provide vibrant and complementary color accents
 * for categories across the news portal.
 * Adheres strictly to the rule: NO emojis and NO em-dashes.
 */

export const categoryColorMap = {
  "Kampus ITERA": {
    name: "Kampus ITERA",
    badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/50",
    text: "text-red-600 dark:text-red-400",
    solidBg: "bg-red-600 text-white",
    softBg: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/50",
    dot: "bg-red-600",
    borderAccent: "hover:border-red-500",
    ring: "ring-red-600",
  },
  "Teknologi": {
    name: "Teknologi",
    badge: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-900/50",
    text: "text-sky-600 dark:text-sky-400",
    solidBg: "bg-sky-600 text-white",
    softBg: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-900/50",
    dot: "bg-sky-500",
    borderAccent: "hover:border-sky-500",
    ring: "ring-sky-600",
  },
  "Nasional": {
    name: "Nasional",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900/50",
    text: "text-indigo-600 dark:text-indigo-400",
    solidBg: "bg-indigo-600 text-white",
    softBg: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900/50",
    dot: "bg-indigo-500",
    borderAccent: "hover:border-indigo-500",
    ring: "ring-indigo-600",
  },
  "Olahraga": {
    name: "Olahraga",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900/50",
    text: "text-emerald-600 dark:text-emerald-400",
    solidBg: "bg-emerald-600 text-white",
    softBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900/50",
    dot: "bg-emerald-500",
    borderAccent: "hover:border-emerald-500",
    ring: "ring-emerald-600",
  },
  "Gaya Hidup": {
    name: "Gaya Hidup",
    badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900/50",
    text: "text-amber-600 dark:text-amber-400",
    solidBg: "bg-amber-600 text-white",
    softBg: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900/50",
    dot: "bg-amber-500",
    borderAccent: "hover:border-amber-500",
    ring: "ring-amber-600",
  },
  "Opini": {
    name: "Opini",
    badge: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/50",
    text: "text-violet-600 dark:text-violet-400",
    solidBg: "bg-violet-600 text-white",
    softBg: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/50",
    dot: "bg-violet-500",
    borderAccent: "hover:border-violet-500",
    ring: "ring-violet-600",
  },
  "Akademik": {
    name: "Akademik",
    badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900/50",
    text: "text-rose-600 dark:text-rose-400",
    solidBg: "bg-rose-600 text-white",
    softBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900/50",
    dot: "bg-rose-500",
    borderAccent: "hover:border-rose-500",
    ring: "ring-rose-600",
  },
  "Riset": {
    name: "Riset",
    badge: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/50",
    text: "text-teal-600 dark:text-teal-400",
    solidBg: "bg-teal-600 text-white",
    softBg: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/50",
    dot: "bg-teal-500",
    borderAccent: "hover:border-teal-500",
    ring: "ring-teal-600",
  },
  "Prestasi": {
    name: "Prestasi",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/50",
    text: "text-blue-600 dark:text-blue-400",
    solidBg: "bg-blue-600 text-white",
    softBg: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/50",
    dot: "bg-blue-500",
    borderAccent: "hover:border-blue-500",
    ring: "ring-blue-600",
  }
};

const defaultColor = {
  name: "Umum",
  badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/50",
  text: "text-red-600 dark:text-red-400",
  solidBg: "bg-red-600 text-white",
  softBg: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/50",
  dot: "bg-red-600",
  borderAccent: "hover:border-red-500",
  ring: "ring-red-600",
};

export function getCategoryTheme(category) {
  if (!category) return defaultColor;
  return categoryColorMap[category] || defaultColor;
}
