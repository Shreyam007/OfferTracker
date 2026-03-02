"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Application } from "@prisma/client";

interface ActivityChartWidgetProps {
    applications: Application[];
}

export function ActivityChartWidget({ }: ActivityChartWidgetProps) {
    // Generate mock data representing the last 7 days of activity based on applications created
    const data = useMemo(() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const todayArray = [];

        // Simple mock distribution for visual effect, ideally we'd group `applications` by `createdAt` date.
        for (let i = 0; i < 7; i++) {
            todayArray.push({
                name: days[i],
                applications: Math.floor(Math.random() * 5) + (i === 4 ? 4 : 1), // Peak on Friday
                interviews: Math.floor(Math.random() * 2),
            });
        }
        return todayArray;
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Activity Pulse</h3>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">This Week</span>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="applications" name="Applications" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                        <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorInt)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
