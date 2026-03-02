"use client";

import { useState } from "react";
import { Send, Clock, Plus, Check } from "lucide-react";

interface Task {
    id: number;
    title: string;
    due: string;
    type: string;
    company?: string;
    isCompleting?: boolean;
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Follow up with Google HR",
        due: "Today, 2:00 PM",
        type: "follow-up",
        company: "Google",
    },
    {
        id: 2,
        title: "Complete Stripe coding challenge",
        due: "Tomorrow, 11:59 PM",
        type: "task",
        company: "Stripe",
    },
    {
        id: 3,
        title: "Prepare for final round",
        due: "Oct 28, 9:00 AM",
        type: "interview",
        company: "Vercel",
    },
];

export function TasksSidebar() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const addNewTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            due: "Just now",
            type: "task",
        };
        setTasks([newTask, ...tasks]);
        setNewTaskTitle("");
    };

    const handleComplete = (taskId: number) => {
        // First set completing state for animation
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleting: true } : t));

        // Remove after animation completes
        setTimeout(() => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
        }, 800);
    };

    return (
        <div className="bg-surface dark:bg-gray-800 rounded-lg border border-border dark:border-gray-700 overflow-hidden h-full flex flex-col transition-colors">
            <div className="p-4 border-b border-border dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Upcoming Tasks</h3>
                <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 transition-all">
                    {tasks.length} New
                </span>
            </div>

            {/* Quick Add Form */}
            <div className="p-3 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/50">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 rounded-md px-3 py-1.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addNewTask()}
                    />
                    <button
                        onClick={addNewTask}
                        disabled={!newTaskTitle.trim()}
                        className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-hover disabled:opacity-50 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white dark:bg-gray-800">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 rounded-lg border shadow-sm transition-all duration-700 ease-in-out ${task.isCompleting
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            : "bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 hover:shadow-md"
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                                {task.isCompleting ? "Task Completed!" : task.title}
                            </h4>
                            {task.isCompleting && <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-bounce" />}
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{task.due}</span>
                        </div>

                        {task.type === "follow-up" && !task.isCompleting ? (
                            <button
                                onClick={() => handleComplete(task.id)}
                                className="w-full relative flex items-center justify-center gap-2 rounded-md bg-white dark:bg-gray-600 border border-border dark:border-gray-500 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-primary dark:hover:text-emerald-400 transition-all group overflow-hidden"
                            >
                                <div className="absolute inset-0 w-0 bg-primary/5 dark:bg-primary/20 transition-all duration-300 ease-out group-hover:w-full"></div>
                                <Send className="w-4 h-4 text-primary dark:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span className="relative z-10">Auto-Send Email</span>
                            </button>
                        ) : !task.isCompleting ? (
                            <button
                                onClick={() => handleComplete(task.id)}
                                className="w-full flex items-center justify-center gap-2 rounded-md bg-white dark:bg-gray-600 border border-border dark:border-gray-500 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all"
                            >
                                Mark Complete
                            </button>
                        ) : null}
                    </div>
                ))}

                {tasks.length === 0 && (
                    <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-500">
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full">
                            <Check className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                        </div>
                        <p>No upcoming tasks. You&apos;re all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
