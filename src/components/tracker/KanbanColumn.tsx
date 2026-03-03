"use client";

import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard, ApplicationType } from "./KanbanCard";
import { MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";

interface ColumnProps {
    id: string;
    title: string;
    applications: ApplicationType[];
    colorBadge: string;
}

export function KanbanColumn({ id, title, applications, colorBadge }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });
    const [showMenu, setShowMenu] = useState(false);
    const [localSort, setLocalSort] = useState<"default" | "match" | "recent">("default");

    const sortedApplications = useMemo(() => {
        if (localSort === "default") return applications;

        const sorted = [...applications];
        if (localSort === "match") {
            sorted.sort((a, b) => {
                const matchA = parseInt(a.tags.find(t => t.type === "match")?.label.split('%')[0] || "0");
                const matchB = parseInt(b.tags.find(t => t.type === "match")?.label.split('%')[0] || "0");
                return matchB - matchA;
            });
        } else if (localSort === "recent") {
            sorted.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        }
        return sorted;
    }, [applications, localSort]);

    return (
        <div className="flex flex-col flex-1 min-w-[260px] sm:min-w-[300px] max-w-[400px] h-full">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h2>
                    <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${colorBadge}`}>
                        {applications.length}
                    </span>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border dark:border-gray-700 py-2 z-50">
                            <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Column Actions</div>
                            <button
                                onClick={() => { setLocalSort("recent"); setShowMenu(false); }}
                                className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${localSort === 'recent' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                Sort by Newest
                            </button>
                            <button
                                onClick={() => { setLocalSort("match"); setShowMenu(false); }}
                                className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${localSort === 'match' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                Sort by Match Score
                            </button>
                            <button
                                onClick={() => { setLocalSort("default"); setShowMenu(false); }}
                                className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${localSort === 'default' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                Default Order
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Droppable Area */}
            <div
                ref={setNodeRef}
                className="flex-1 bg-surface dark:bg-gray-800/50 rounded-xl p-3 flex flex-col gap-3 min-h-[500px]"
            >
                <SortableContext items={sortedApplications.map((app) => app.id)} strategy={verticalListSortingStrategy}>
                    {sortedApplications.map((application) => (
                        <KanbanCard key={application.id} application={application} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
