"use client";

import { useState } from "react";
import { Briefcase, MapPin, Bot } from "lucide-react";

interface SearchHeaderProps {
    onScrapeStart: (params: { title: string, location: string, remote: boolean }) => void;
    isScraping: boolean;
}

export function SearchHeader({ onScrapeStart, isScraping }: SearchHeaderProps) {
    const [title, setTitle] = useState("Senior UX Designer");
    const [location, setLocation] = useState("Remote");
    const [isRemote, setIsRemote] = useState(true);

    const handleScrape = () => {
        onScrapeStart({ title, location, remote: isRemote });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 p-4 sm:p-6 shadow-sm transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Job Title Input */}
                <div>
                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title / Keywords
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="job-title"
                            id="job-title"
                            className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                            placeholder="Senior UX Designer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                {/* Location Input & Button */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                    </label>
                    <div className="flex gap-4">
                        <div className="relative flex-grow rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                placeholder="Remote"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleScrape}
                            disabled={isScraping}
                            className={`flex-shrink-0 flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all
                ${isScraping
                                    ? 'bg-emerald-400 cursor-wait'
                                    : 'bg-primary hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                                }`}
                        >
                            <Bot className={`h-5 w-5 ${isScraping ? 'animate-pulse' : ''}`} />
                            {isScraping ? 'Scraping...' : 'Start Scraping'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sources:</span>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isRemote}
                            onChange={(e) => setIsRemote(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Remote Only</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
