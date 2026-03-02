"use client";

import { useState, useRef } from "react";
import { Linkedin, Camera, Trash2, Save, CheckCircle } from "lucide-react";
import { ResumeUploadZone } from "./ResumeUploadZone";
import { useSettings } from "@/hooks/useSettings";
import { useSession } from "next-auth/react";

export function PersonalInfo() {
    const { settings, updateSettings } = useSettings();
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaved, setIsSaved] = useState(false);

    const [form, setForm] = useState({
        displayName: "",
        jobTitle: "",
        phone: "",
        email: "",
        linkedin: "",
    });
    const [initializedFromSettings, setInitializedFromSettings] = useState(false);

    // Initialize form from settings once loaded
    if (settings && !initializedFromSettings && (settings.displayName || settings.email || session?.user?.email)) {
        setForm({
            displayName: settings.displayName || session?.user?.name || "",
            jobTitle: settings.jobTitle || "",
            phone: settings.phone || "",
            email: settings.email || session?.user?.email || "",
            linkedin: settings.linkedin || "",
        });
        setInitializedFromSettings(true);
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            updateSettings({ photoUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        updateSettings({
            displayName: form.displayName,
            jobTitle: form.jobTitle,
            phone: form.phone,
            email: form.email,
            linkedin: form.linkedin,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    const displayEmail = form.email || session?.user?.email || "No email available";
    const initials = displayEmail !== "No email available"
        ? displayEmail[0].toUpperCase()
        : "?";

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-gradient-to-br from-emerald-400 to-teal-600 text-white text-2xl font-black shadow-lg">
                    {settings.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-full">{displayEmail}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{form.jobTitle || "Add your job title"}</p>
                    <div className="flex gap-3 justify-center sm:justify-start">
                        {settings.photoUrl && (
                            <button
                                onClick={() => updateSettings({ photoUrl: "" })}
                                className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                            >
                                <Trash2 className="w-3 h-3" /> Remove
                            </button>
                        )}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                        >
                            <Camera className="w-3 h-3" /> {settings.photoUrl ? "Change Photo" : "Upload Photo"}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                        />
                    </div>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={form.displayName}
                        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                        placeholder="Enter your full name"
                        className="block w-full rounded-lg border-0 px-3 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        value={form.jobTitle}
                        onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        placeholder="e.g. Software Engineer"
                        className="block w-full rounded-lg border-0 px-3 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        className="block w-full rounded-lg border-0 px-3 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="block w-full rounded-lg border-0 px-3 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm transition-colors"
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile URL</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Linkedin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="url"
                            id="linkedin"
                            value={form.linkedin}
                            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/username"
                            className="block w-full rounded-lg border-0 px-3 py-2.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm transition-colors"
                        />
                    </div>
                </div>
            </div>

            <ResumeUploadZone />

            {/* Update Button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${isSaved
                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95"
                        }`}
                >
                    {isSaved ? (
                        <><CheckCircle className="w-4 h-4" /> Saved!</>
                    ) : (
                        <><Save className="w-4 h-4" /> Update Profile</>
                    )}
                </button>
            </div>
        </div>
    );
}
