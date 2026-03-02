"use client";

import { useEffect, useState } from "react";

export default function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Check if preloader has already been shown in this session
        const hasBeenShown = sessionStorage.getItem("preloader_shown");

        if (hasBeenShown) {
            setIsLoading(false);
            return;
        }

        // Keep loader on screen for at least 800ms for a visual effect on first load
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("preloader_shown", "true");
        }, 800);

        return () => clearTimeout(timer);
    }, []);



    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm transition-opacity duration-500 ease-in-out">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-24 h-24 border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-ping opacity-75"></div>
                {/* Inner Ring */}
                <div className="absolute w-16 h-16 border-4 border-indigo-500 border-t-transparent dark:border-indigo-400 dark:border-t-transparent rounded-full animate-spin"></div>
                {/* Core Dot */}
                <div className="w-6 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
                    OfferTrack
                </h2>
            </div>
        </div>
    );
}
