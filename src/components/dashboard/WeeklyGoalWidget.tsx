"use client";

import { Target } from "lucide-react";

export function WeeklyGoalWidget() {
    const target = 10;
    const current = 6; // Mock data for now, ideally fetched from stats
    const percentage = Math.round((current / target) * 100);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <Target className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Weekly Application Goal</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full">
                    {current} / {target}
                </span>
            </div>

            <div className="space-y-2">
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${percentage}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {target - current} more to reach your goal! Keep it up 🔥
                </p>
            </div>
        </div>
    );
}
