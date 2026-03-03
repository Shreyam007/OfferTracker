import { StatGrid } from "@/components/dashboard/StatGrid";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { getApplications } from "@/app/actions/applications";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import { WeeklyGoalWidget } from "@/components/dashboard/WeeklyGoalWidget";
import { ActivityChartWidget } from "@/components/dashboard/ActivityChartWidget";
import { AIInsightsWidget } from "@/components/dashboard/AIInsightsWidget";
import { TasksSidebar } from "@/components/dashboard/TasksSidebar";

export default async function Home() {
  const applications = await getApplications();

  const stats = [
    {
      id: 1,
      name: "Applications",
      stat: applications.length.toString(),
      icon: "Briefcase",
      trend: "up" as const,
      color: "text-blue-500"
    },
    {
      id: 2,
      name: "Interviews",
      stat: applications.filter(a => a.status === "INTERVIEW").length.toString(),
      icon: "Calendar",
      trend: "up" as const,
      color: "text-yellow-500"
    },
    {
      id: 3,
      name: "Offers",
      stat: applications.filter(a => a.status === "OFFER").length.toString(),
      icon: "CheckCircle2",
      trend: "neutral" as const,
      color: "text-emerald-500"
    },
    {
      id: 4,
      name: "Rejections",
      stat: applications.filter(a => a.status === "REJECTED").length.toString(),
      icon: "XCircle",
      trend: "down" as const,
      color: "text-red-500"
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full pb-6">
      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col min-h-0 space-y-6 overflow-y-auto scrollbar-hide pr-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back, Alex. Here is an overview of your job search progress.</p>
        </div>

        <QuickActionsWidget />

        <StatGrid stats={stats} />

        {/* Charts & Insights Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 flex flex-col">
            <ActivityChartWidget applications={applications} />
          </div>
          <div className="xl:col-span-1 flex flex-col space-y-6">
            <WeeklyGoalWidget current={applications.length} />
            <AIInsightsWidget />
          </div>
        </div>

        <div className="rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <RecentActivityTable applications={applications} />
        </div>
      </div>

      {/* Right Column (Tasks) */}
      <div className="hidden lg:flex w-80 flex-shrink-0 flex-col min-h-0">
        <TasksSidebar />
      </div>
    </div>
  );
}
