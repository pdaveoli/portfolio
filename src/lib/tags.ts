export const TAG_CONFIG = {
    "Web Development": { color: "bg-blue-500/10", textColor: "text-blue-500", borderColor: "bg-blue-500/40" },
    "Game Development": { color: "bg-purple-500/10", textColor: "text-purple-500", borderColor: "bg-purple-500/40" },
    "Software Development": { color: "bg-green-500/10", textColor: "text-green-500", borderColor: "bg-purple-500/40" },
    "Unity": { color: "bg-gray-800/10", textColor: "text-gray-800", borderColor: "text-gray-800/40" },
    "Next.Js": { color: "bg-black/10", textColor: "text-black dark:text-white", borderColor: "bg-black/40" },
    "React.Js": { color: "bg-cyan-400/10", textColor: "text-cyan-400", borderColor: "bg-cyan-500/40"},
    "Tailwind CSS": { color: "bg-teal-500/10", textColor: "text-teal-500", borderColor: "bg-teal-500/40" },
    "Open Source": { color: "bg-orange-500/10", textColor: "text-orange-500", borderColor: "bg-orange-500/40" },
    "Itch.io": { color: "bg-red-500/10", textColor: "text-red-500", borderColor: "bg-red-500/40" },
    "Github": { color: "bg-gray-900/10", textColor: "text-gray-900", borderColor: "bg-gray-900/40" },
} as const;

export type Tag = keyof typeof TAG_CONFIG;

export const ALL_TAGS = Object.keys(TAG_CONFIG) as Tag[];
