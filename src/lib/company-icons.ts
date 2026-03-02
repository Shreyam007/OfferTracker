import {
    Apple,
    Chrome,
    Figma,
    Linkedin,
    Triangle,
    Zap,
    Shield,
    Square,
    Airplay,
    Building2,
    Command
} from "lucide-react";

export const companyIconMap: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
    "Google": {
        icon: Chrome,
        color: "text-rose-500 dark:text-rose-400",
        bgColor: "bg-rose-50 dark:bg-rose-900/40 border-rose-100 dark:border-rose-800"
    },
    "Apple": {
        icon: Apple,
        color: "text-gray-900 dark:text-white",
        bgColor: "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    "Figma": {
        icon: Figma,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/40 border-purple-100 dark:border-purple-800"
    },
    "Vercel": {
        icon: Triangle,
        color: "text-black dark:text-white",
        bgColor: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    "Linear": {
        icon: Command,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-100 dark:border-indigo-800"
    },
    "Stark Industries": {
        icon: Shield,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/40 border-red-100 dark:border-red-800"
    },
    "TechFlow Systems": {
        icon: Zap,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800"
    },
    "Airbnb": {
        icon: Airplay,
        color: "text-rose-500 dark:text-rose-400",
        bgColor: "bg-rose-50 dark:bg-rose-900/40 border-rose-100 dark:border-rose-800"
    },
    "Raycast": {
        icon: Square,
        color: "text-red-500 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/40 border-red-100 dark:border-red-800"
    },
    "LinkedIn": {
        icon: Linkedin,
        color: "text-[#0A66C2] dark:text-[#70B5F9]",
        bgColor: "bg-blue-50 dark:bg-blue-900/40 border-blue-100 dark:border-blue-800"
    }
};

export const getCompanyTheme = (companyName: string) => {
    // Normalize company name for lookup
    const normalized = companyName.trim();

    // Exact match
    if (companyIconMap[normalized]) return companyIconMap[normalized];

    // Case-insensitive partial match
    const key = Object.keys(companyIconMap).find(k =>
        normalized.toLowerCase().includes(k.toLowerCase())
    );

    if (key) return companyIconMap[key];

    // Default fallback
    return {
        icon: Building2,
        color: "text-primary dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800"
    };
};
