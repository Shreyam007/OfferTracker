"use client";

import { useState } from "react";
import { X, Sparkles, PlusCircle, Check, Star } from "lucide-react";
import { createApplication } from "@/app/actions/applications";
import { CompanyLogo } from "@/components/common/CompanyLogo";

export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    timeAgo: string;
    description: string;
    salary: string;
    type: string;
    matchScore: number;
    source: string;
}

export function JobCard({ job, showRibbon, isFeatured }: { job: JobListing, showRibbon?: boolean, isFeatured?: boolean }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [actionStatus, setActionStatus] = useState<"idle" | "completing" | "dismissing" | "gone">("idle");

    // Source badge styling
    const sourceBg =
        job.source === "LinkedIn" ? "bg-[#0A66C2]" :
            job.source === "Indeed" ? "bg-[#2164F4]" :
                job.source === "Glassdoor" ? "bg-[#0CAA41]" : "bg-indigo-600";

    const sourceLabel =
        job.source === "LinkedIn" ? "in" :
            job.source === "Indeed" ? "Id" :
                job.source === "Glassdoor" ? "Gd" :
                    job.source.substring(0, 2);

    const handleAddToTracker = async () => {
        setIsAdding(true);
        setActionStatus("completing");
        try {
            await createApplication({
                companyName: job.company,
                role: job.title,
                location: job.location,
                description: job.description,
                salaryRange: job.salary,
                source: job.source,
                matchScore: job.matchScore
            });
            setIsAdded(true);

            // Allow animation to complete before "disappearing"
            setTimeout(() => setActionStatus("gone"), 1000);
        } catch (error) {
            console.error("Failed to add job to tracker:", error);
            setActionStatus("idle");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDismiss = () => {
        setActionStatus("dismissing");
        setTimeout(() => setActionStatus("gone"), 1000);
    };

    if (actionStatus === "gone") return null;

    return (
        <div
            className={`transition-all duration-1000 ease-in-out origin-top overflow-hidden
                ${actionStatus !== "idle" ? "max-h-0 opacity-0 scale-95 m-0 p-0 border-0" : "max-h-[800px]"}
            `}
        >
            <div className={`relative group h-full mb-6 ${isFeatured ? 'p-0.5' : ''}`}>
                {isFeatured && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                )}
                <div
                    className={`bg-white dark:bg-gray-800 rounded-xl border p-5 flex flex-col h-[280px] shadow-sm transition-all duration-700 ease-in-out transform relative
                        ${actionStatus === "completing" ? "bg-white/90 dark:bg-gray-800/90 border-emerald-200 dark:border-emerald-800 scale-95 opacity-0 -translate-y-4 shadow-xl" : ""}
                        ${actionStatus === "dismissing" ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 scale-90 opacity-0 translate-x-4 grayscale" : "border-border dark:border-gray-700 hover:shadow-md"}
                    `}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                            <CompanyLogo
                                companyName={job.company}
                                className="w-12 h-12"
                                iconClassName="w-6 h-6"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">{job.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{job.company} • {job.location}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                            {showRibbon && (
                                <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ring-1 ring-blue-700/10 dark:ring-blue-500/20 shadow-sm">
                                    <Star className="w-2 h-2 fill-blue-700 dark:fill-blue-400" />
                                    Best Match
                                </div>
                            )}
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{job.timeAgo}</span>
                            <span className={`text-[10px] font-black text-white px-1.5 py-0.5 rounded uppercase ${sourceBg}`}>
                                {sourceLabel}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">
                        {job.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                            {job.salary}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                            {job.type}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium
                  ${job.matchScore >= 90 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                job.matchScore >= 80 ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400'}`}>
                            <Sparkles className="w-3 h-3" />
                            {job.matchScore}% Match
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                        <button
                            onClick={handleAddToTracker}
                            disabled={isAdding || isAdded || actionStatus !== "idle"}
                            className={`flex-grow flex justify-center items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all
                          ${isAdded ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-primary hover:bg-emerald-600'}`}
                        >
                            {isAdding || actionStatus === "completing" ? "Adding..." : isAdded ? (
                                <><Check className="w-4 h-4" /> Added</>
                            ) : (
                                <><PlusCircle className="w-4 h-4" /> Add to Tracker</>
                            )}
                        </button>
                        <button
                            onClick={handleDismiss}
                            disabled={actionStatus !== "idle"}
                            className="flex-shrink-0 flex justify-center items-center rounded-md bg-white dark:bg-gray-800 border border-border dark:border-gray-700 px-3 py-2 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 dark:hover:border-rose-800 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function JobCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 p-5 flex flex-col h-[280px] shadow-sm animate-pulse">
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 w-full">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </div>
                </div>
            </div>
            <div className="space-y-2 mt-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
            <div className="flex gap-2 mt-6">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
            <div className="flex gap-2 mt-auto pt-4">
                <div className="h-9 flex-grow bg-gray-200 dark:bg-gray-700 rounded-md" />
                <div className="h-9 w-11 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
        </div>
    );
}
