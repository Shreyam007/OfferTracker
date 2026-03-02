"use client";

import { useState } from "react";
import { updateApplicationNotes } from "@/app/actions/applications";
import { Check } from "lucide-react";

export function NotesEditor({ applicationId, initialNotes }: { applicationId: string, initialNotes: string }) {
    const [notes, setNotes] = useState(initialNotes);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        setSaved(false);
        try {
            await updateApplicationNotes(applicationId, notes);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Failed to save note:", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Notes</h2>
                <span className="text-xs text-gray-400">
                    {saved ? "All changes saved" : "Changes auto-saved to disk"}
                </span>
            </div>

            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 p-3 text-sm border-0 bg-gray-50 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary resize-none outline-none transition-all"
                placeholder="Jot down interview notes, questions to ask, or thoughts..."
            ></textarea>

            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all
                    ${saved
                            ? 'bg-emerald-100 text-emerald-700 pointer-events-none'
                            : 'bg-primary text-white hover:bg-emerald-600 shadow-sm shadow-primary/20 hover:shadow-lg active:scale-95'
                        }`}
                >
                    {isSaving ? "Saving..." : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save Note"}
                </button>
            </div>
        </div>
    );
}
