"use client";

import { useState } from "react";
import { PersonalInfo } from "@/components/settings/PersonalInfo";
import { Integrations } from "@/components/settings/Integrations";
import { PreferencesForm } from "@/components/settings/PreferencesForm";
import { SecuritySection } from "@/components/settings/SecuritySection";
import { BillingSection } from "@/components/settings/BillingSection";
import { User, Layers, Sliders, Shield, CreditCard } from "lucide-react";

type TabProps = {
    id: "profile" | "integrations" | "preferences" | "security" | "billing";
    label: string;
    icon: React.ElementType;
};

const tabs: TabProps[] = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "integrations", label: "Integrations", icon: Layers },
    { id: "preferences", label: "Scraping Preferences", icon: Sliders },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabProps["id"]>("profile");

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Manage your account preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
                {/* Left Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    title={tab.label}
                                    className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg font-medium transition-all text-left flex-shrink-0 lg:w-full ${isActive
                                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-500" : "text-gray-400 dark:text-gray-500"}`} />
                                    <span className="hidden sm:inline lg:inline whitespace-nowrap">{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 max-w-3xl pb-12 w-full lg:w-auto">
                    {activeTab === "profile" && <PersonalInfo />}
                    {activeTab === "integrations" && <Integrations />}
                    {activeTab === "preferences" && <PreferencesForm />}
                    {activeTab === "security" && <SecuritySection />}
                    {activeTab === "billing" && <BillingSection />}
                </div>
            </div>
        </div>
    );
}
