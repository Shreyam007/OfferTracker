"use client";

import React, { createElement, ElementType, ReactNode } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from 'recharts';
import {
    Activity,
    Target,
    Zap,
    Link as LinkIcon,
    TrendingUp,
    ShieldCheck,
    Cpu
} from "lucide-react";
import { ApplicationWithJob } from "@/types/application";

interface AnalyticsDashboardProps {
    applications: ApplicationWithJob[];
}

export function AnalyticsDashboard({ applications }: AnalyticsDashboardProps) {

    // Process data for Status Distribution
    const statusCounts = applications.reduce((acc: Record<string, number>, app) => {
        const status = app.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.keys(statusCounts).map(status => ({
        name: status.charAt(0) + status.slice(1).toLowerCase(),
        value: statusCounts[status]
    }));

    // Mock data for Search Velocity (App counts over last 7 days)
    const velocityData = [
        { day: 'Mon', apps: 4 },
        { day: 'Tue', apps: 7 },
        { day: 'Wed', apps: 5 },
        { day: 'Thu', apps: 8 },
        { day: 'Fri', apps: 12 },
        { day: 'Sat', apps: 6 },
        { day: 'Sun', apps: 9 },
    ];

    const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#F43F5E'];

    // Process data for AI Match Score Distribution
    const scoreBuckets = [
        { name: '90-100', value: 0 },
        { name: '80-89', value: 0 },
        { name: '70-79', value: 0 },
        { name: '60-69', value: 0 },
        { name: '<60', value: 0 },
    ];

    applications.forEach(app => {
        const score = app.aiMatchScore || 0;
        if (score >= 90) scoreBuckets[0].value++;
        else if (score >= 80) scoreBuckets[1].value++;
        else if (score >= 70) scoreBuckets[2].value++;
        else if (score >= 60) scoreBuckets[3].value++;
        else scoreBuckets[4].value++;
    });

    const successRate = Math.round((applications.filter(a => a.status === 'INTERVIEW' || a.status === 'OFFER').length / (applications.length || 1)) * 100);

    return (
        <div className="space-y-6 sm:space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Analytics Hub</h1>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Real-time intelligence for your career progression.</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-border dark:border-gray-700 shadow-sm self-start md:self-auto">
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Success Rate</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{successRate}%</p>
                    </div>
                </div>
            </div>

            {/* Top Row: Success Progress & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-border dark:border-gray-700 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                        <Target className="w-32 h-32 text-gray-900 dark:text-white" />
                    </div>

                    <div className="relative w-48 h-48 mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96" cy="96" r="80"
                                stroke="currentColor" strokeWidth="12"
                                fill="transparent" className="text-gray-100 dark:text-gray-700"
                            />
                            <circle
                                cx="96" cy="96" r="80"
                                stroke="currentColor" strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={502.4}
                                strokeDashoffset={502.4 - (successRate / 100) * 502.4}
                                strokeLinecap="round"
                                className="text-emerald-500 transition-all duration-1000 ease-out"
                                style={{ stroke: 'url(#successGradient)' }}
                            />
                            <defs>
                                <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#3B82F6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-gray-900 dark:text-white">{successRate}%</span>
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Efficiency</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium px-4">
                        You&apos;re outperforming <span className="text-emerald-600 dark:text-emerald-400 font-bold">84%</span> of applicants in your field this week.
                    </p>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <SummaryCard
                        title="Total Active"
                        value={applications.length}
                        icon={Activity}
                        color="text-indigo-600 dark:text-indigo-400"
                        bg="bg-indigo-50 dark:bg-indigo-900/40"
                        trend="+12%"
                    />
                    <SummaryCard
                        title="Avg Match"
                        value={`${Math.round(applications.reduce((acc, a) => acc + (a.aiMatchScore || 0), 0) / (applications.length || 1))}%`}
                        icon={Zap}
                        color="text-amber-600 dark:text-amber-400"
                        bg="bg-amber-50 dark:bg-amber-900/40"
                        trend="+5%"
                    />
                    <SummaryCard
                        title="Top Source"
                        value="LinkedIn"
                        icon={LinkIcon}
                        color="text-blue-600 dark:text-blue-400"
                        bg="bg-blue-50 dark:bg-blue-900/40"
                        trend="Stable"
                    />
                    <SummaryCard
                        title="Search Strength"
                        value="High"
                        icon={ShieldCheck}
                        color="text-emerald-600 dark:text-emerald-400"
                        bg="bg-emerald-50 dark:bg-emerald-900/40"
                        trend="+8%"
                    />
                </div>
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer title="Application Flow" icon={Activity}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={velocityData}>
                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="apps"
                                stroke="#10B981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#areaGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="AI Match Distribution" icon={Cpu}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scoreBuckets}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <Tooltip
                                cursor={{ fill: '#F9FAFB' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#6366F1"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                            >
                                {scoreBuckets.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#6366F1' : '#E5E7EB'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-3xl border border-border dark:border-gray-700 shadow-sm overflow-hidden relative group">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-full h-[240px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%" cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: 'currentColor' }}
                                    itemStyle={{ color: '#000' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        {statusData.map((entry, index) => (
                            <div key={entry.name} className="flex flex-col p-3 sm:p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-700/30 border border-gray-100/50 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-default">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{entry.name}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{entry.value}</span>
                                    <span className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500">Apps</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, icon, color, bg, trend }: { title: string, value: string | number, icon: ElementType, color: string, bg: string, trend?: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-border dark:border-gray-700 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <div className={`${bg} p-3 rounded-2xl transition-transform group-hover:scale-110`}>
                    {createElement(icon, { className: `w-6 h-6 ${color}` })}
                </div>
                {trend && (
                    <span className={`text-xs font-black px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{value}</p>
            </div>
        </div>
    );
}

function ChartContainer({ title, icon, children }: { title: string, icon: ElementType, children: ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-3xl border border-border dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                    {createElement(icon, { className: "w-5 h-5 text-gray-600 dark:text-gray-300" })}
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">{title}</h3>
            </div>
            <div className="h-56 sm:h-72 w-full">
                {children}
            </div>
        </div>
    );
}
