"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Search, BarChart3, Settings, X } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Applications", href: "/applications", icon: FileText },
    { name: "Job Search", href: "/search", icon: Search },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-surface dark:bg-gray-800 border-r border-border dark:border-gray-700 h-full transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex items-center justify-between h-16 border-b border-border dark:border-gray-700 px-4 lg:justify-center lg:px-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Main 4-pointed star */}
                                <path d="M12 2C12 2 13.5 8.5 12 12C10.5 8.5 12 2 12 2Z" fill="white" />
                                <path d="M12 22C12 22 10.5 15.5 12 12C13.5 15.5 12 22 12 22Z" fill="white" />
                                <path d="M2 12C2 12 8.5 10.5 12 12C8.5 13.5 2 12 2 12Z" fill="white" />
                                <path d="M22 12C22 12 15.5 13.5 12 12C15.5 10.5 22 12 22 12Z" fill="white" />
                                {/* Small sparkle top-right */}
                                <circle cx="18" cy="5" r="1.2" fill="white" opacity="0.9" />
                                {/* Small sparkle bottom-left */}
                                <circle cx="6" cy="18" r="0.8" fill="white" opacity="0.7" />
                                {/* Diagonal accents */}
                                <path d="M12 12L16 4" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                                <path d="M12 12L8 20" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                                <path d="M12 12L4 8" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                                <path d="M12 12L20 16" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-primary">OfferTrack</h1>
                    </div>
                    <button
                        type="button"
                        className="p-2 -mr-2 rounded-md lg:hidden text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col py-4 gap-4">
                    <div className="px-2 flex-shrink-0">
                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                            ? "bg-primary/10 text-primary dark:bg-primary/20"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
