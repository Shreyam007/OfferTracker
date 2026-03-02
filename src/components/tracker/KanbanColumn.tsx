"use client";

import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard, ApplicationType } from "./KanbanCard";
import { MoreHorizontal } from "lucide-react";

interface ColumnProps {
    id: string;
    title: string;
    applications: ApplicationType[];
    colorBadge: string;
}

export function KanbanColumn({ id, title, applications, colorBadge }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });

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
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Droppable Area */}
            <div
                ref={setNodeRef}
                className="flex-1 bg-surface dark:bg-gray-800/50 rounded-xl p-3 flex flex-col gap-3 min-h-[500px]"
            >
                <SortableContext items={applications.map((app) => app.id)} strategy={verticalListSortingStrategy}>
                    {applications.map((application) => (
                        <KanbanCard key={application.id} application={application} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
