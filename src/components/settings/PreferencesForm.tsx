"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export function PreferencesForm() {
    const { settings, updateSettings } = useSettings();
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!settings.targetJobTitles.includes(inputValue.trim())) {
                updateSettings({
                    targetJobTitles: [...settings.targetJobTitles, inputValue.trim()],
                });
            }
            setInputValue("");
        }
    };

    const removeTitle = (titleToRemove: string) => {
        updateSettings({
            targetJobTitles: settings.targetJobTitles.filter((t) => t !== titleToRemove),
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Scraping Preferences</h2>

            <div className="space-y-6">
                {/* Target Job Titles */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Job Titles</label>
                    <div className="min-h-[42px] border border-gray-300 dark:border-gray-600 rounded-lg p-1.5 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 bg-white dark:bg-gray-700 transition-colors">
                        {settings.targetJobTitles.map((title) => (
                            <span key={title} className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 px-2 py-1 rounded-md text-sm font-medium">
                                {title}
                                <button
                                    onClick={() => removeTitle(title)}
                                    className="text-emerald-500 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors focus:outline-none"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            className="flex-grow border-0 focus:ring-0 p-1 text-sm text-gray-900 dark:text-white bg-transparent min-w-[120px] placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            placeholder="Add title... (Press Enter)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Location</label>
                        <select
                            value={settings.preferredLocation}
                            onChange={(e) => updateSettings({ preferredLocation: e.target.value })}
                            className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 transition-colors"
                        >
                            <option>Remote Only</option>
                            <option>Hybrid</option>
                            <option>On-site</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Level</label>
                        <select
                            value={settings.experienceLevel}
                            onChange={(e) => updateSettings({ experienceLevel: e.target.value })}
                            className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 transition-colors"
                        >
                            <option>Entry Level</option>
                            <option>Mid-Level</option>
                            <option>Senior</option>
                            <option>Lead</option>
                        </select>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-6 pt-6">
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">AI Automation</h3>

                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">AI Offer Prediction</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Estimate salary ranges and success probability.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateSettings({ aiOfferPrediction: !settings.aiOfferPrediction })}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${settings.aiOfferPrediction ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                role="switch"
                                aria-checked={settings.aiOfferPrediction}
                            >
                                <span className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.aiOfferPrediction ? "translate-x-5" : "translate-x-0"
                                    }`}></span>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Auto-Follow-up Drafts</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically generate follow-up emails for stuck applications.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateSettings({ autoFollowUp: !settings.autoFollowUp })}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${settings.autoFollowUp ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                role="switch"
                                aria-checked={settings.autoFollowUp}
                            >
                                <span className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.autoFollowUp ? "translate-x-5" : "translate-x-0"
                                    }`}></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-6 pt-6">
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Appearance</h3>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode for the entire application.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" })}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${settings.theme === "dark" ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                                }`}
                            role="switch"
                            aria-checked={settings.theme === "dark"}
                        >
                            <span className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.theme === "dark" ? "translate-x-5" : "translate-x-0"
                                }`}></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
