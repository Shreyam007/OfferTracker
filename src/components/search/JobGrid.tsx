"use client";

import { useState } from "react";
import { SearchHeader } from "./SearchHeader";
import { JobCard, JobCardSkeleton, JobListing } from "./JobCard";
import { ChevronDown, Sparkles } from "lucide-react";

// Mock Data for Search
const mockJobs: JobListing[] = [
    {
        id: "1",
        title: "Senior Product Designer",
        company: "TechFlow Systems",
        location: "San Francisco (Remote)",
        timeAgo: "2h ago",
        description: "We are looking for a Senior Product Designer to join our core team. You will be responsible for leading design initiatives...",
        salary: "$140k - $180k",
        type: "Full-time",
        matchScore: 95,
        source: "LinkedIn",
    },
    {
        id: "2",
        title: "Frontend Developer",
        company: "Stark Industries",
        location: "New York, NY",
        timeAgo: "5h ago",
        description: "Seeking a talented frontend developer proficient in React and Tailwind CSS. Join our fast-paced team building the future of...",
        salary: "$120k - $150k",
        type: "Hybrid",
        matchScore: 82,
        source: "LinkedIn",
    },
];

// Recommended Jobs (Matches your skills)
const RECOMMENDED_JOBS: JobListing[] = [
    {
        id: "rec-1",
        title: "Senior UX Engineer",
        company: "Apple",
        location: "Cupertino (Remote)",
        timeAgo: "1h ago",
        description: "Leading the next generation of spatial computing interfaces. Expert knowledge of React and design systems required.",
        salary: "$190k - $240k",
        type: "Full-time",
        matchScore: 99,
        source: "Internal",
    },
    {
        id: "rec-2",
        title: "Lead Frontend Architect",
        company: "Vercel",
        location: "Remote",
        timeAgo: "4h ago",
        description: "Help us build the future of the web. Deep expertise in Next.js, React, and performance optimization is a must.",
        salary: "$200k+",
        type: "Full-time",
        matchScore: 98,
        source: "Top Match",
    },
    {
        id: "rec-3",
        title: "Full Stack Engineer",
        company: "Linear",
        location: "Remote",
        timeAgo: "6h ago",
        description: "Join the team building the best tool for software developers. Focus on high-performance interactive UI and robust backend.",
        salary: "$160k - $210k",
        type: "Full-time",
        matchScore: 97,
        source: "Verified",
    },
    {
        id: "rec-4",
        title: "Interaction Designer",
        company: "Figma",
        location: "San Francisco / Remote",
        timeAgo: "2h ago",
        description: "Designing the tools that designers use. Strong prototyping skills and eye for detail are essential.",
        salary: "$170k - $220k",
        type: "Full-time",
        matchScore: 96,
        source: "Exclusive",
    },
    {
        id: "rec-5",
        title: "Senior React Developer",
        company: "Airbnb",
        location: "Remote",
        timeAgo: "12h ago",
        description: "Scaling the world's largest marketplace. Work on high-traffic consumer interfaces with modern React paradigms.",
        salary: "$180k - $230k",
        type: "Full-time",
        matchScore: 95,
        source: "LinkedIn",
    },
    {
        id: "rec-6",
        title: "Product Engineer",
        company: "Raycast",
        location: "Remote",
        timeAgo: "1d ago",
        description: "Building the ultimate productivity tool. We value engineers who care deeply about UX and performance.",
        salary: "$150k - $190k",
        type: "Full-time",
        matchScore: 94,
        source: "Top Match",
    },
];

export function JobGrid() {
    const [isScraping, setIsScraping] = useState(false);
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [hasScraped, setHasScraped] = useState(false);

    const simulateScrape = (params: { title: string, location: string, remote: boolean }) => {
        setIsScraping(true);
        setJobs([]); // Clear previous jobs
        setHasScraped(false);

        // Simulate network delay
        setTimeout(() => {
            const filtered = mockJobs.filter(job => {
                const titleMatch = job.title.toLowerCase().includes(params.title.toLowerCase()) ||
                    job.company.toLowerCase().includes(params.title.toLowerCase());
                const locationMatch = !params.location || job.location.toLowerCase().includes(params.location.toLowerCase());
                const typeMatch = !params.remote || job.type === "Full-time" || (job.location && job.location.toLowerCase().includes("remote"));

                return titleMatch && locationMatch && typeMatch;
            });

            setJobs(filtered.length > 0 ? filtered : mockJobs);
            setIsScraping(false);
            setHasScraped(true);
        }, 2000);
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Find & Add Jobs</h1>
                <p className="text-gray-500 text-lg font-medium">Scrape top platforms to populate your pipeline and get AI predictions.</p>
            </div>

            <SearchHeader onScrapeStart={simulateScrape} isScraping={isScraping} />

            {/* Results Section */}
            {(isScraping || hasScraped) ? (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">New Jobs Found</h2>
                            {!isScraping && (
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-800">
                                    {jobs.length}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Date Posted
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                            <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Salary Range
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                            <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Remote / On-site
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                        {isScraping ? (
                            // Skeleton Loaders
                            <>
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                            </>
                        ) : (
                            // Actual Jobs
                            jobs.map((job) => <JobCard key={job.id} job={job} />)
                        )}
                    </div>
                </div>
            ) : (
                // Recommended Jobs by Default
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-xl">
                                <Sparkles className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Matches Your Skills</h2>
                                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">(matches ur skills)</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                        {RECOMMENDED_JOBS.map((job) => (
                            <JobCard key={job.id} job={job} showRibbon={true} isFeatured={true} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
