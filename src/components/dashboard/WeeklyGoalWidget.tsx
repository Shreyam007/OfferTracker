"use client";

import { Target, PartyPopper, X } from "lucide-react";
import { useState, useEffect } from "react";

export function WeeklyGoalWidget({ current = 0 }: { current?: number }) {
    const target = 10;
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        if (current >= target && target > 0) {
            const lastCelebratedStr = localStorage.getItem('weeklyGoalMetTime');
            const now = Date.now();
            let shouldCelebrate = true;

            if (lastCelebratedStr) {
                const lastCelebrated = parseInt(lastCelebratedStr, 10);
                // 24 hours in ms = 24 * 60 * 60 * 1000
                if (now - lastCelebrated < 24 * 60 * 60 * 1000) {
                    shouldCelebrate = false;
                }
            }

            if (shouldCelebrate) {
                setShowCelebration(true);
                localStorage.setItem('weeklyGoalMetTime', now.toString());
                const timer = setTimeout(() => setShowCelebration(false), 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [current, target]);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm relative">
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
                        {current >= target ? (
                            <span className="text-emerald-500">Goal reached! Unstoppable! 🚀</span>
                        ) : (
                            `${target - current} more to reach your goal! Keep it up 🔥`
                        )}
                    </p>
                </div>
            </div>

            {/* Celebration Popup Overlay */}
            {showCelebration && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/5 backdrop-blur-[1px]">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] p-8 max-w-sm w-full mx-4 text-center animate-in zoom-in-95 duration-500 pointer-events-auto border border-emerald-100 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-2xl"></div>

                        <button
                            onClick={() => setShowCelebration(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors z-10 bg-gray-50 dark:bg-gray-800 rounded-full p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="relative z-10 space-y-4 flex flex-col items-center">
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center font-black animate-bounce shadow-xl rotate-12">
                                <PartyPopper className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Woohoo! 🎉</h2>
                                <p className="font-bold text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2">
                                    You've crushed your weekly goal with <span className="text-emerald-600 dark:text-emerald-400">{current}/{target}</span> applications! Incredible work!
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCelebration(false)}
                                className="mt-4 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform"
                            >
                                Continue tracking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
