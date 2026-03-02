"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface UserSettings {
    displayName: string;
    jobTitle: string;
    phone: string;
    email: string;
    linkedin: string;
    photoUrl: string; // base64 data URL or empty
    theme: "light" | "dark";
    // Integration toggles
    gmailConnected: boolean;
    linkedinConnected: boolean;
    slackConnected: boolean;
    calendarConnected: boolean;
    // Scraping preferences
    preferredLocation: string;
    experienceLevel: string;
    targetJobTitles: string[];
    aiOfferPrediction: boolean;
    autoFollowUp: boolean;
    // Security
    twoFactorEnabled: boolean;
}

const defaultSettings: UserSettings = {
    displayName: "",
    jobTitle: "",
    phone: "",
    email: "",
    linkedin: "",
    photoUrl: "",
    theme: "light",
    gmailConnected: false,
    linkedinConnected: false,
    slackConnected: false,
    calendarConnected: false,
    preferredLocation: "Remote Only",
    experienceLevel: "Mid-Level",
    targetJobTitles: [],
    aiOfferPrediction: true,
    autoFollowUp: false,
    twoFactorEnabled: false,
};

interface SettingsContextType {
    settings: UserSettings;
    updateSettings: (partial: Partial<UserSettings>) => void;
    isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => { },
    isLoaded: false,
});

const STORAGE_KEY = "offertrack-settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setSettings({ ...defaultSettings, ...parsed });
            }
        } catch (e) {
            console.error("Failed to load settings:", e);
        }
        setIsLoaded(true);
    }, []);

    // Apply theme class to <html>
    useEffect(() => {
        if (!isLoaded) return;
        const root = document.documentElement;
        if (settings.theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [settings.theme, isLoaded]);

    const updateSettings = useCallback((partial: Partial<UserSettings>) => {
        setSettings((prev) => {
            const next = { ...prev, ...partial };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch (e) {
                console.error("Failed to save settings:", e);
            }
            return next;
        });
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoaded }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
