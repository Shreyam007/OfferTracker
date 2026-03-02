"use client";

import { useState } from "react";
import { X, Briefcase, MapPin, Building2, Target } from "lucide-react";

import { createApplication } from "@/app/actions/applications";

export function AddApplicationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<string>("APPLIED");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createApplication({
                companyName: company,
                role: role,
                location: location,
                source: "Manual Entry"
            }, status);
            onClose();
            // Reset form
            setCompany("");
            setRole("");
            setLocation("");
        } catch (error) {
            console.error("Failed to add application:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-border dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Application</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary dark:text-emerald-400" /> Company Name
                        </label>
                        <input
                            required
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full rounded-lg border border-border dark:border-gray-600 bg-transparent dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all font-medium placeholder:text-gray-400"
                            placeholder="e.g. OpenAI"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary dark:text-emerald-400" /> Role / Title
                        </label>
                        <input
                            required
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-lg border border-border dark:border-gray-600 bg-transparent dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all font-medium placeholder:text-gray-400"
                            placeholder="e.g. Senior Frontend Engineer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary dark:text-emerald-400" /> Location
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full rounded-lg border border-border dark:border-gray-600 bg-transparent dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all font-medium placeholder:text-gray-400"
                                placeholder="e.g. Remote"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary dark:text-emerald-400" /> Initial Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-border dark:border-gray-600 bg-transparent dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all font-medium"
                            >
                                <option value="APPLIED">Applied</option>
                                <option value="INTERVIEW">Interview</option>
                                <option value="OFFER">Offer</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-border dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 rounded-lg bg-primary font-semibold text-white hover:bg-emerald-600 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Adding..." : "Add to Tracker"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
