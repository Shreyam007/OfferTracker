import { getApplications } from "@/app/actions/applications";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics | OfferTrack",
    description: "Your job search performance at a glance.",
};

export default async function AnalyticsPage() {
    const applications = await getApplications();

    return (
        <div className="h-full overflow-auto">
            <AnalyticsDashboard applications={applications} />
        </div>
    );
}
