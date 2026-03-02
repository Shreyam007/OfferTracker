"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, User, Settings, LogOut, CheckCircle, Info, AlertTriangle, Trash2, Menu, LayoutDashboard, FileText, BarChart3, Briefcase, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useSettings } from "@/hooks/useSettings";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "info" | "success" | "warning";
}

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "Application Updated",
        description: "Your Apple application moved to 'Interview' stage.",
        time: "5m ago",
        type: "success"
    },
    {
        id: "2",
        title: "New Match Found",
        description: "We found a 98% match at Vercel for your skills.",
        time: "1h ago",
        type: "info"
    },
    {
        id: "3",
        title: "Resume Tip",
        description: "Consider adding 'Next.js' to your resume title.",
        time: "3h ago",
        type: "warning"
    }
];

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    const { data: session } = useSession();
    const { settings } = useSettings();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
    const [isClearingAll, setIsClearingAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Searchable items
    const searchableItems = useMemo(() => [
        { name: "Dashboard", href: "/", icon: LayoutDashboard, description: "Overview of your job search progress", category: "Page", keywords: ["home", "overview", "stats"] },
        { name: "Applications", href: "/applications", icon: FileText, description: "Manage all your job applications", category: "Page", keywords: ["jobs", "applied", "tracker", "kanban"] },
        { name: "Job Search", href: "/search", icon: Search, description: "Find and scrape new job listings", category: "Page", keywords: ["find", "scrape", "browse", "listings"] },
        { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Charts and insights on your progress", category: "Page", keywords: ["charts", "graphs", "insights", "data"] },
        { name: "Settings", href: "/settings", icon: Settings, description: "Profile, preferences, and integrations", category: "Page", keywords: ["profile", "preferences", "account", "integrations"] },
        { name: "Add Application", href: "/applications", icon: Plus, description: "Add a new job application", category: "Action", keywords: ["new", "create", "add", "application"] },
        { name: "Find Jobs", href: "/search", icon: Briefcase, description: "Search and discover new opportunities", category: "Action", keywords: ["search", "find", "discover", "opportunities"] },
    ], []);

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return searchableItems.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.keywords.some(k => k.includes(q))
        );
    }, [searchQuery, searchableItems]);

    // Close search dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClearAll = () => {
        setIsClearingAll(true);
        // Delay the actual clearing to allow fade animation to finish
        setTimeout(() => {
            setNotifications([]);
            setIsClearingAll(false);
        }, 800);
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <header className="flex items-center justify-between h-16 px-4 border-b border-border dark:border-gray-800 bg-white dark:bg-gray-900 sm:px-6 lg:px-8 relative z-50 transition-colors">
            {/* Mobile Menu Button */}
            <button
                type="button"
                className="p-2 -ml-2 rounded-md lg:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                onClick={onMenuClick}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Search Bar */}
            <div className="flex flex-1 relative" ref={searchRef}>
                <div className="flex w-full md:ml-0">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full text-gray-400 dark:text-gray-500 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        </div>
                        <input
                            id="search-field"
                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-300 focus:ring-0 focus:border-transparent sm:text-sm bg-transparent font-medium"
                            placeholder="Search jobs, applications..."
                            type="search"
                            name="search"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsSearchOpen(true);
                                setSelectedIndex(-1);
                            }}
                            onFocus={() => setIsSearchOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
                                } else if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                                } else if (e.key === "Enter" && selectedIndex >= 0) {
                                    e.preventDefault();
                                    const item = filteredResults[selectedIndex];
                                    router.push(item.href);
                                    setSearchQuery("");
                                    setIsSearchOpen(false);
                                } else if (e.key === "Escape") {
                                    setIsSearchOpen(false);
                                }
                            }}
                        />
                    </div>
                </div>

                {isSearchOpen && searchQuery.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-[60] max-h-80 overflow-y-auto">
                        {filteredResults.length > 0 ? (
                            <div className="py-1">
                                {filteredResults.map((item, index) => (
                                    <button
                                        key={item.href + item.name}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${index === selectedIndex ? "bg-primary/5 dark:bg-primary/10 text-primary dark:text-emerald-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                            }`}
                                        onClick={() => {
                                            router.push(item.href);
                                            setSearchQuery("");
                                            setIsSearchOpen(false);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${index === selectedIndex ? "bg-primary/10 dark:bg-primary/20" : "bg-gray-100 dark:bg-gray-700"}`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{item.name}</p>
                                            <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{item.description}</p>
                                        </div>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider flex-shrink-0">{item.category}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No results for &ldquo;{searchQuery}&rdquo;</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching for pages, features, or actions</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right section: profile, notifications */}
            <div className="flex items-center ml-4 space-x-1.5 md:ml-6">
                {/* Notifications Wrapper */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsNotificationsOpen(!isNotificationsOpen);
                            setIsProfileOpen(false);
                        }}
                        className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors relative group ${isNotificationsOpen ? 'bg-gray-100 text-primary' : 'text-gray-400'}`}
                    >
                        <span className="sr-only">View notifications</span>
                        <Bell className={`w-6 h-6 transition-transform ${isNotificationsOpen ? 'scale-110' : 'group-hover:rotate-12'}`} aria-hidden="true" />
                        {notifications.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden origin-top-right transition-all z-50">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={handleClearAll}
                                        className="text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    <div className={`divide-y divide-gray-50 dark:divide-gray-700/50 transition-all duration-700 ${isClearingAll ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100'}`}>
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group">
                                                <div className="flex gap-3">
                                                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 
                                                        ${notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                                                            notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                                                                'bg-blue-50 text-blue-600'}`}>
                                                        {notif.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                                                            notif.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                                                <Info className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors">{notif.title}</p>
                                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{notif.description}</p>
                                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 font-medium">{notif.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-4 py-12 text-center">
                                        <div className="mx-auto w-12 h-12 bg-gray-50 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center mb-3">
                                            <Bell className="w-6 h-6 text-gray-300 dark:text-gray-500" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">All caught up!</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">No new notifications at the moment.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsProfileOpen((prev) => !prev);
                            setIsNotificationsOpen(false);
                        }}
                        className={`flex items-center max-w-xs text-sm bg-white dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-primary py-1.5 px-3 border transition-all hover:border-primary/30 dark:hover:border-primary/50 ${isProfileOpen ? 'border-primary dark:border-primary ring-2 ring-primary/10 dark:ring-primary/20' : 'border-gray-200 dark:border-gray-700'}`}
                        id="user-menu-button"
                    >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white dark:ring-gray-800 overflow-hidden font-bold text-[10px] uppercase">
                            {settings.photoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={settings.photoUrl} alt="User" className="w-full h-full object-cover" />
                            ) : settings.displayName || session?.user?.name ? (
                                <span>{(settings.displayName || session?.user?.name as string)[0].toUpperCase()}</span>
                            ) : session?.user?.email ? (
                                <span>{session.user.email[0].toUpperCase()}</span>
                            ) : (
                                <User className="w-4 h-4" />
                            )}
                        </div>
                        <span className="ml-2 mr-1 font-bold text-gray-700 dark:text-gray-200 hidden sm:block truncate max-w-[120px]">
                            {settings.displayName || session?.user?.name || session?.user?.email || "Email not available"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 hidden sm:block transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>

                    {/* Account Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                            <div className="px-4 py-4 border-b border-gray-50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[9px]">Personal Account</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5 italic truncate">{settings.displayName || session?.user?.name || session?.user?.email || "alex.morgan@design.io"}</p>
                            </div>
                            <div className="p-1.5">
                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-emerald-400 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-all group lg:hidden"
                                >
                                    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    My Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-emerald-400 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-all group"
                                >
                                    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                                        <Settings className="w-4 h-4" />
                                    </div>
                                    Settings
                                </Link>
                                <div className="my-1.5 border-t border-gray-100 dark:border-gray-700/50" />
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all group"
                                >
                                    <div className="w-8 h-8 bg-rose-50/50 dark:bg-rose-900/40 rounded-lg flex items-center justify-center group-hover:bg-white dark:group-hover:bg-rose-900/60 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
