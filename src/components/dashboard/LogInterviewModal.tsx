"use client";

import { useState } from "react";
import { X, Calendar, Search, Building2, Briefcase } from "lucide-react";

interface LogInterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LogInterviewModal({ isOpen, onClose }: LogInterviewModalProps) {
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleLog = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <Calendar className="w-5 h-5" />
                        <h2 className="font-semibold">Log New Interview</h2>
                    </div>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Application</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="Search by company or role..." className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                                </div>
                            </div>

                            <div className="border border-gray-100 dark:border-gray-700 rounded-lg max-h-48 overflow-y-auto space-y-1 p-1">
                                {/* Mock Options */}
                                <button onClick={() => setStep(2)} className="w-full text-left p-3 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-md flex items-center gap-3 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Google</div>
                                        <div className="text-xs text-gray-500">Frontend Engineer</div>
                                    </div>
                                </button>
                                <button onClick={() => setStep(2)} className="w-full text-left p-3 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-md flex items-center gap-3 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Stripe</div>
                                        <div className="text-xs text-gray-500">Full Stack Developer</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interview Round</label>
                                <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                                    <option>Initial Screening</option>
                                    <option>Technical Round</option>
                                    <option>System Design</option>
                                    <option>Behavioral / Cultural</option>
                                    <option>Onsite / Final</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                    <input type="date" className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                    <input type="time" className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Link / Location</label>
                                <input type="text" placeholder="https://zoom.us/j/..." className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
                                <button onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    Back
                                </button>
                                <button disabled={isSaving} onClick={handleLog} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2">
                                    {isSaving ? "Scheduling..." : "Log Interview"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
