"use client";

import { createElement } from "react";
import { Briefcase, Calendar, CheckCircle2, XCircle } from "lucide-react";

interface Stat {
    id: number;
    name: string;
    stat: string;
    icon: string;
    trend: "up" | "down" | "neutral";
    color: string;
}

const iconMap: Record<string, React.ElementType> = {
    Briefcase,
    Calendar,
    CheckCircle2,
    XCircle,
};

export function StatGrid({ stats }: { stats: Stat[] }) {
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-border dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1"
                    >
                        {/* Decorative background element */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] transition-transform group-hover:scale-110 ${item.color.replace('text', 'bg')}`} />

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className={`rounded-xl p-3 border border-border dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 ${item.color} shadow-sm`}>
                                    {createElement(iconMap[item.icon] || Briefcase, {
                                        className: "h-6 w-6",
                                        "aria-hidden": "true",
                                    })}
                                </div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-full ${item.trend === 'up' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                                    item.trend === 'down' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                        'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {item.trend === 'up' ? '+12%' : item.trend === 'down' ? '-4%' : 'Stable'}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                    {item.name}
                                </p>
                                <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                                    {item.stat}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
