"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { KeyRound, Smartphone, ShieldCheck, MonitorSmartphone } from "lucide-react";

export function SecuritySection() {
    const { settings, updateSettings } = useSettings();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would call an API
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert("Password updated successfully");
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                        />
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                        <Smartphone className="w-6 h-6 text-gray-400" />
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Authenticator App</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use an app like Authy or Google Authenticator</p>
                        </div>
                    </div>
                    <button
                        onClick={() => updateSettings({ twoFactorEnabled: !settings.twoFactorEnabled })}
                        className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${settings.twoFactorEnabled
                                ? "bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40"
                                : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                            }`}
                    >
                        {settings.twoFactorEnabled ? "Disable" : "Enable"}
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                            <MonitorSmartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Sessions</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage and sign out your active sessions.</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        Sign out all devices
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                            <MonitorSmartphone className="w-5 h-5 text-emerald-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Windows 11 • Chrome <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full ml-2">Current Session</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">San Francisco, CA • Active now</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                            <Smartphone className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">iPhone 14 Pro • Safari</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">San Francisco, CA • Last active: 2 hours ago</p>
                            </div>
                        </div>
                        <button className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500">Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
