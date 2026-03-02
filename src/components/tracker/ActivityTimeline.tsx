"use client";

import { Clock } from "lucide-react";

interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    status: "completed" | "current" | "upcoming";
}

const mockEvents: TimelineEvent[] = [
    {
        id: "1",
        title: "Upcoming: Portfolio Review",
        description: "Scheduled via Google Meet with Lead Designer.",
        date: "Tomorrow, 2:00 PM",
        status: "upcoming",
    },
    {
        id: "2",
        title: "Recruiter Screening",
        description: "Talked to Sarah. Went well, discussed salary expectations.",
        date: "Oct 15, 2023",
        status: "completed",
    },
    {
        id: "3",
        title: "Application Submitted",
        description: "Applied via LinkedIn Easy Apply.",
        date: "Oct 12, 2023",
        status: "completed",
    },
];

export function ActivityTimeline() {
    return (
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-gray-900">Activity Timeline</h2>
                <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                    <span className="text-lg leading-none">+</span> Log Activity
                </button>
            </div>

            <div className="relative">
                {/* Continuous straight line in background */}
                <div className="absolute left-[11px] top-3 bottom-8 w-px bg-gray-200" />

                <ul className="space-y-8">
                    {mockEvents.map((event) => {
                        return (
                            <li key={event.id} className="relative flex gap-6">

                                {/* Icon Marker */}
                                <div className="relative z-10 flex-shrink-0 bg-white">
                                    {event.status === "upcoming" ? (
                                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center ring-4 ring-white">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        </div>
                                    ) : event.status === "current" ? (
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center ring-4 ring-white">
                                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                    ) : (
                                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white">
                                            <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-grow pt-0.5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h3 className={`font-semibold ${event.status === "upcoming" ? "text-gray-900" : "text-gray-700"}`}>
                                            {event.title}
                                        </h3>
                                        <span className={`text-xs whitespace-nowrap mt-1 sm:mt-0 ${event.status === "upcoming" ? "bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium" : "text-gray-400"}`}>
                                            {event.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {event.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
