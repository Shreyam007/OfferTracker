"use client";

import { Zap, CheckCircle2, AlertCircle } from "lucide-react";

export function BillingSection() {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Current Plan</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">You are currently on the Pro plan. Billed annually.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                            Active
                        </span>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">$12<span className="text-sm font-medium text-gray-500 dark:text-gray-400">/mo</span></p>
                    </div>
                </div>

                <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">Plan Features</h3>
                        </div>
                        <button className="text-sm font-semibold text-primary hover:text-emerald-600 transition-colors">
                            Upgrade to Enterprise
                        </button>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Job Tracking</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Resume Matching (500/mo)</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Follow-ups</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Interview Prep Generation</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Method</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your billing information.</p>
                    </div>
                    <button className="text-sm font-semibold px-4 py-2 border border-primary text-primary hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                        Add New
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold font-mono">
                            VISA
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                Visa ending in 4242
                                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-sm">Default</span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2026</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Edit
                    </button>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p>Your next billing date is December 1, 2026. You will be automatically charged $144 for an annual subscription.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Billing History</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600 dark:text-gray-300">
                            <tr className="border-b border-gray-100 dark:border-gray-700/50">
                                <td className="py-4">Dec 1, 2025</td>
                                <td className="py-4 font-medium text-gray-900 dark:text-white">$144.00</td>
                                <td className="py-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">Paid</span>
                                </td>
                                <td className="py-4 text-right">
                                    <a href="#" className="font-medium text-primary hover:text-emerald-600 transition-colors">Download PDF</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4">Dec 1, 2024</td>
                                <td className="py-4 font-medium text-gray-900 dark:text-white">$144.00</td>
                                <td className="py-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">Paid</span>
                                </td>
                                <td className="py-4 text-right">
                                    <a href="#" className="font-medium text-primary hover:text-emerald-600 transition-colors">Download PDF</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
