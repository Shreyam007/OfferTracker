import { simulatePrediction } from "@/app/actions/predict";
import { AIPredictionWidget } from "@/components/tracker/AIPredictionWidget";
import { ActivityTimeline } from "@/components/tracker/ActivityTimeline";
import { NotesEditor } from "@/components/tracker/NotesEditor";
import { getApplications } from "@/app/actions/applications";
import { Building2, MapPin, ExternalLink, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { notFound } from "next/navigation";

export default async function ApplicationDetailsPage({ params }: { params: { id: string } }) {
    const applications = await getApplications();
    const application = applications.find(a => a.id === params.id);

    if (!application) {
        notFound();
    }

    const jobRole = application.job?.role || "Senior Product Designer";
    const company = application.job?.companyName || "Spotify";
    const location = application.job?.location || "New York, NY (Remote)";

    const { score, tip } = await simulatePrediction(
        jobRole + " " + (application.job?.description || ""),
        "Figma Expert Senior UX"
    );

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-full pb-10">
            {/* Left Column (Main Content) */}
            <div className="flex-1 min-w-0 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Link href="/" className="hover:text-primary transition-colors">Dashboard</Link>
                            <span>/</span>
                            <Link href="/applications" className="hover:text-primary transition-colors">Applications</Link>
                            <span>/</span>
                            <span className="font-semibold text-gray-900">{company}</span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{jobRole}</h1>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest border
                                ${application.status === 'INTERVIEW' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                    application.status === 'OFFER' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        application.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-100' :
                                            'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                <span className={`h-1.5 w-1.5 rounded-full mr-2 
                                    ${application.status === 'INTERVIEW' ? 'bg-yellow-600' :
                                        application.status === 'OFFER' ? 'bg-emerald-600' :
                                            application.status === 'REJECTED' ? 'bg-red-600' :
                                                'bg-blue-600'}`} />
                                {application.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{company}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 self-start flex-shrink-0">
                        <Link href="/applications" className="inline-flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all active:scale-95">
                            <Send className="w-4 h-4" />
                            Send Follow-up
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col justify-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Date Applied</span>
                        <span className="text-lg font-bold text-gray-900">{application.appliedDate}</span>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col justify-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">AI Match</span>
                        <span className="text-lg font-bold text-gray-900">{application.aiMatchScore}%</span>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col justify-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Status</span>
                        <span className="text-lg font-bold text-gray-900 lowercase first-letter:uppercase">{application.status}</span>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col justify-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Source</span>
                        <span className="text-lg font-bold text-blue-600 flex items-center gap-1">
                            <ExternalLink className="w-4 h-4" />
                            {application.job?.source || "Search"}
                        </span>
                    </div>
                </div>

                <ActivityTimeline />

                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Job Description</h2>
                        <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                            View Original <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="prose prose-sm text-gray-600 max-w-none">
                        <p>{application.job?.description || "No description provided."}</p>
                    </div>
                </div>

                <NotesEditor applicationId={application.id} initialNotes={application.notes || ""} />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-6">
                <AIPredictionWidget score={score} tip={tip} />

                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Contact Info</h2>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold overflow-hidden shadow-inner relative">
                            <NextImage src={`https://i.pravatar.cc/150?u=${company}`} alt="Contact" fill className="object-cover" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Sarah Jenkins</h3>
                            <p className="text-xs text-gray-500">Recruiter @ {company}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Send className="w-4 h-4 text-gray-400" />
                            <span>sarah.j@company.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
