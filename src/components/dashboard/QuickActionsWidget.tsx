"use client";

import { Plus, Calendar, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddApplicationModal } from "./AddApplicationModal";
import { LogInterviewModal } from "./LogInterviewModal";

export function QuickActionsWidget() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Add Application</span>
            </button>

            <button
                onClick={() => setIsLogModalOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Log Interview</span>
            </button>

            <Link
                href="/settings"
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Update Resume</span>
            </Link>

            <Link
                href="/mock-interview"
                className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl border border-transparent shadow-sm hover:shadow-lg hover:opacity-90 transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">AI Mock Interview</span>
            </Link>

            {isAddModalOpen && (
                <AddApplicationModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}

            {isLogModalOpen && (
                <LogInterviewModal
                    isOpen={isLogModalOpen}
                    onClose={() => setIsLogModalOpen(false)}
                />
            )}
        </div>
    );
}
