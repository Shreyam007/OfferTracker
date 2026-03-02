import { JobGrid } from "@/components/search/JobGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Job Search | OfferTrack",
    description: "Find and add jobs to your tracker.",
};

export default function SearchPage() {
    return (
        <div className="h-full">
            <JobGrid />
        </div>
    );
}
