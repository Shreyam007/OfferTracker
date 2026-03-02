"use client";

import { useState } from "react";
import { Mail, Linkedin, Slack, Calendar, Lock, Link2, Unlink } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const integrations = [
    {
        key: "gmailConnected" as const,
        name: "Gmail",
        icon: Mail,
        iconColor: "text-red-500",
        description: "Connect your inbox to enable auto-follow ups on applications.",
    },
    {
        key: "linkedinConnected" as const,
        name: "LinkedIn",
        icon: Linkedin,
        iconColor: "text-[#0A66C2]",
        description: "Import job listings and track applications from LinkedIn.",
    },
    {
        key: "slackConnected" as const,
        name: "Slack",
        icon: Slack,
        iconColor: "text-[#E01E5A]",
        description: "Get real-time notifications on application status changes.",
    },
    {
        key: "calendarConnected" as const,
        name: "Google Calendar",
        icon: Calendar,
        iconColor: "text-blue-500",
        description: "Sync interview schedules and reminders to your calendar.",
    },
];

export function Integrations() {
    const { settings, updateSettings } = useSettings();
    const [connectingKey, setConnectingKey] = useState<string | null>(null);

    const handleToggle = (key: typeof integrations[number]["key"]) => {
        setConnectingKey(key);
        // Simulate connection delay
        setTimeout(() => {
            updateSettings({ [key]: !settings[key] });
            setConnectingKey(null);
        }, 1200);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Integrations</h2>

            <div className="space-y-4">
                {integrations.map((item) => {
                    const isConnected = settings[item.key];
                    const isConnecting = connectingKey === item.key;

                    return (
                        <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl gap-4 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                        <span className={`inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${isConnected
                                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isConnected ? "bg-emerald-500" : "bg-gray-400"}`} />
                                            {isConnected ? "Connected" : "Disconnected"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleToggle(item.key)}
                                disabled={isConnecting}
                                className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 ${isConnected
                                        ? "bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-600"
                                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                                    }`}
                            >
                                {isConnecting ? (
                                    <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                                ) : isConnected ? (
                                    <><Unlink className="w-4 h-4" /> Disconnect</>
                                ) : (
                                    <><Link2 className="w-4 h-4" /> Connect</>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400 dark:text-gray-500">
                <Lock className="w-3.5 h-3.5" />
                <p>We value your privacy. Your data is encrypted and secure.</p>
            </div>
        </div>
    );
}
