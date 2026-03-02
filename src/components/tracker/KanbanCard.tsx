"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { CompanyLogo } from "@/components/common/CompanyLogo";

export interface ApplicationType {
    id: string;
    role: string;
    company: string;
    columnId: string;
    appliedDate: string;
    tags: { label: string; type: "match" | "remote" | "default" | "pick" }[];
    isOffer?: boolean;
    salary?: string;
}

interface KanbanCardProps {
    application: ApplicationType;
}

export function KanbanCard({ application }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: application.id, data: { type: "Application", application } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white/50 dark:bg-gray-800/50 border-2 border-primary/50 border-dashed rounded-xl h-36 w-full opacity-50"
            />
        );
    }

    if (application.isOffer) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-400 dark:border-emerald-500 p-4 shadow-[0_4px_20px_rgb(16,185,129,0.08)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all relative group hover:-translate-y-1"
            >
                <div className="flex justify-between items-start mb-4 gap-2">
                    <div className="flex gap-3">
                        <div className="relative flex-shrink-0">
                            <CompanyLogo companyName={application.company} />
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white">
                                <span className="block w-2 h-2 text-white">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white leading-tight text-sm tracking-tight line-clamp-1">{application.role}</h4>
                            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 uppercase tracking-wide">{application.company}</p>
                        </div>
                    </div>
                    <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm tracking-wider whitespace-nowrap uppercase">
                        Offer
                    </div>
                </div>

                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl p-3 mb-4 border border-emerald-100 dark:border-emerald-800 flex items-center justify-between">
                    <div className="min-w-0">
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-gray-900 dark:text-white">{application.salary}</span>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">/ yr</span>
                        </div>
                        <p className="text-[9px] font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest truncate">Full-time • Remote</p>
                    </div>
                    <div {...attributes} {...listeners} className="cursor-grab hover:bg-emerald-100/50 dark:hover:bg-emerald-800/50 p-1.5 rounded-lg transition-colors flex-shrink-0">
                        <GripVertical className="w-4 h-4 text-emerald-600/40 dark:text-emerald-400/40" />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); alert('Offer Accepted!'); }}
                        className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black py-2 rounded-lg transition-all shadow-md shadow-emerald-100 active:scale-95 uppercase tracking-wider"
                    >
                        Accept
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); alert('Offer Refused'); }}
                        className="flex-1 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 text-[10px] font-bold py-2 rounded-lg transition-all active:scale-95 uppercase tracking-wider"
                    >
                        Decline
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-t border-emerald-50 dark:border-emerald-900/30 pt-3">
                    <span>Expiring in 3 days</span>
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                        Live
                    </span>
                </div>
            </div>
        );
    }

    // Render Default State (Applied/Interview)
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow group relative"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <CompanyLogo companyName={application.company} />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-1">{application.role}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{application.company}</p>
                    </div>
                </div>
                <div {...attributes} {...listeners} className="cursor-grab hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded -mr-2">
                    <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {application.tags.map((tag, idx) => {
                    let tagClasses = "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600";
                    if (tag.type === "match") tagClasses = "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50";
                    if (tag.type === "remote") tagClasses = "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50";
                    if (tag.type === "pick") tagClasses = "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50";

                    return (
                        <span key={idx} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${tagClasses}`}>
                            {tag.type === "match" && <span className="mr-1">✨</span>}
                            {tag.type === "pick" && <span className="mr-1">🔥</span>}
                            {tag.label}
                        </span>
                    );
                })}
            </div>

            <div className="flex justify-between items-end mt-auto pt-2 border-t border-gray-50 dark:border-gray-700 border-dashed">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                    Applied {application.appliedDate}
                </p>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
