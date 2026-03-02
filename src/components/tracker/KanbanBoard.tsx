"use client";

import { useState, useMemo, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard, ApplicationType } from "./KanbanCard";
import { Search, Filter, Plus } from "lucide-react";
import { AddApplicationModal } from "@/components/dashboard/AddApplicationModal";

import { updateApplicationStatus } from "@/app/actions/applications";
import { ApplicationWithJob } from "@/types/application";

export function KanbanBoard({ initialApplications }: { initialApplications: ApplicationWithJob[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Transform applications from DB to Kanban format
    const transformApplications = (apps: ApplicationWithJob[]) => {
        const data: Record<string, ApplicationType[]> = {
            applied: [],
            interview: [],
            offer: [],
            rejected: []
        };

        apps.forEach(app => {
            const columnId = app.status.toLowerCase();
            if (data[columnId]) {
                data[columnId].push({
                    id: app.id,
                    role: app.job?.role || app.role || "Untitled Role",
                    company: app.job?.companyName || app.company || "Unknown Company",
                    appliedDate: app.appliedDate ?? "",
                    columnId: columnId,
                    tags: app.aiMatchScore ? [{ label: `${app.aiMatchScore}% Match`, type: "match" }] : [],
                    isOffer: columnId === "offer",
                    salary: app.job?.salaryRange || "$150k"
                });
            }
        });

        return data;
    };

    const [columns, setColumns] = useState(() => transformApplications(initialApplications));

    // Update columns when props change (e.g. after server action revalidation)
    useEffect(() => {
        setColumns(transformApplications(initialApplications));
    }, [initialApplications]);

    // Derived filtered columns for display
    const filteredColumns = useMemo(() => {
        if (!searchTerm) return columns;

        const term = searchTerm.toLowerCase();
        const filtered: Record<string, ApplicationType[]> = {};

        Object.keys(columns).forEach(key => {
            filtered[key] = columns[key].filter(app =>
                app.role.toLowerCase().includes(term) ||
                app.company.toLowerCase().includes(term)
            );
        });

        return filtered;
    }, [searchTerm, columns]);
    const [activeCard, setActiveCard] = useState<ApplicationType | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { application } = active.data.current as { application: ApplicationType };
        setActiveCard(application);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        setActiveCard(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeColumnId = findColumnOfCard(activeId);
        const overColumnId = Object.keys(columns).includes(overId) ? overId : findColumnOfCard(overId);

        if (!activeColumnId || !overColumnId) return;

        if (activeColumnId !== overColumnId) {
            // Update UI State immediately
            const activeItems = columns[activeColumnId];
            const overItems = columns[overColumnId];
            const activeIndex = activeItems.findIndex((item) => item.id === activeId);
            const activeItem = activeItems[activeIndex];

            const updatedItem = {
                ...activeItem,
                columnId: overColumnId,
                isOffer: overColumnId === "offer"
            };

            setColumns({
                ...columns,
                [activeColumnId]: activeItems.filter((item) => item.id !== activeId),
                [overColumnId]: [...overItems, updatedItem],
            });

            // Persist to JSON DB
            try {
                await updateApplicationStatus(activeId, overColumnId.toUpperCase() as ApplicationWithJob["status"]);
            } catch (err) {
                console.error("Failed to persist status update:", err);
            }
        }
    };

    const findColumnOfCard = (id: string) => {
        return Object.keys(columns).find((key) =>
            columns[key].some((app) => app.id === id)
        );
    };

    return (
        <div className="flex flex-col h-full space-y-4 sm:space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Applications</h1>
                        <p className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Track and manage your active job opportunities.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95 uppercase tracking-wider w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4 stroke-[3px]" />
                        Add New
                    </button>
                </div>

                <div className="flex gap-2 sm:gap-3">
                    <div className="relative group flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search applications..."
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-border dark:border-gray-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm w-full font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-sm"
                        />
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-gray-800 px-3 sm:px-5 py-2.5 text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm active:scale-95 uppercase tracking-wider flex-shrink-0">
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>
            </div>

            {/* Board Section - horizontal scroll on mobile */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-8 min-h-0 flex-1 -mx-4 sm:mx-0 px-4 sm:px-0">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <KanbanColumn
                        id="applied"
                        title="Applied"
                        applications={filteredColumns.applied}
                        colorBadge="bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                    />
                    <KanbanColumn
                        id="interview"
                        title="Interview"
                        applications={filteredColumns.interview}
                        colorBadge="bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50"
                    />
                    <KanbanColumn
                        id="offer"
                        title="Offer"
                        applications={filteredColumns.offer}
                        colorBadge="bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50"
                    />

                    <DragOverlay>
                        {activeCard ? <KanbanCard application={activeCard} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <AddApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
