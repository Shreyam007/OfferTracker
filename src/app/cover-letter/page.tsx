"use client";

import { PenTool, FileText, Download, Wand2, Loader2, CheckCircle2 } from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { getApplications } from "@/app/actions/applications";
import { ApplicationWithJob } from "@/types/application";

type Tone = "Professional" | "Enthusiastic" | "Confident" | "Short & Direct";

export default function CoverLetterGeneratorPage() {
    const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<string>("");
    const [selectedTone, setSelectedTone] = useState<Tone>("Professional");
    const [jobDescription, setJobDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [activeTarget, setActiveTarget] = useState<ApplicationWithJob | null>(null);

    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch applications on mount since it's a client component now
        getApplications().then((data) => {
            setApplications(data as ApplicationWithJob[]);
            if (data.length > 0) {
                setSelectedAppId(data[0].id);
            }
        });
    }, []);

    const handleGenerate = () => {
        if (!selectedAppId) return;
        setIsGenerating(true);
        const target = applications.find(a => a.id === selectedAppId) || null;
        setActiveTarget(target);

        // Simulate AI generation delay
        setTimeout(() => {
            const role = target?.job?.role || 'the role';
            const company = target?.job?.companyName || 'the company';

            let draft = "";
            switch (selectedTone) {
                case "Professional":
                    draft = `Dear Hiring Manager at ${company},\n\nI am writing to express my strong professional interest in the ${role} position. My background aligns closely with the requirements outlined in the job description...\n\nI have a proven track record of delivering high-quality, scalable solutions and collaborating effectively across cross-functional teams. I am confident that my technical expertise and dedication to engineering best practices make me a strong fit for this role.`;
                    break;
                case "Enthusiastic":
                    draft = `Hi Team at ${company}!\n\nI am absolutely thrilled to apply for the ${role} position! I've been a huge fan of the products you build, and the opportunity to contribute my skills to your team's mission is incredibly exciting to me.\n\nI am deeply passionate about creating exceptional user experiences and I know that my energy, technical background, and eagerness to drive impact would allow me to hit the ground running.`;
                    break;
                case "Confident":
                    draft = `To the Hiring Team at ${company},\n\nI am the ideal candidate for the ${role} position. With my extensive technical background and history of driving measurable results, I am uniquely positioned to add immediate value to your engineering organization.\n\nMy ability to independently own complex architectural challenges and deliver them on schedule has consistently resulted in significant business impact in my previous roles.`;
                    break;
                case "Short & Direct":
                    draft = `Dear Hiring Manager,\n\nI am applying for the ${role} role at ${company}. My skills directly align with your requirements.\n\nI look forward to discussing how my experience can benefit your team.`;
                    break;
            }

            if (jobDescription) {
                draft += `\n\nFurthermore, focusing specifically on elements from your job description: I have extensive experience in those specific technologies and methodologies mentioned.`;
            }

            setGeneratedContent(draft);
            setIsGenerating(false);
        }, 1500);
    };

    const handleDownloadPDF = async () => {
        if (!pdfRef.current || !generatedContent) return;

        const html2pdf = (await import('html2pdf.js')).default;

        const element = pdfRef.current;
        const opt = {
            margin: 1,
            filename: `Cover_Letter_${activeTarget?.job?.companyName || 'Draft'}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto pr-2 pb-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    <PenTool className="w-7 h-7 text-emerald-500" />
                    AI Cover Letter Studio
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                    Instantly draft a highly personalized, tailored cover letter matching your extracted resume skills against any target job description.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110"></div>

                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">1. Select Target Application</h3>
                        <select
                            value={selectedAppId}
                            onChange={(e) => setSelectedAppId(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-white font-medium mb-6"
                        >
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <option key={app.id} value={app.id}>
                                        {app.job?.companyName || 'Unknown Company'} - {app.job?.role || 'Unknown Role'}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No applications tracked yet</option>
                            )}
                        </select>

                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">2. Job Description (Optional)</h3>
                        <textarea
                            rows={5}
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here so the AI can tailor keywords precisely..."
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-white placeholder:text-gray-400 resize-none mb-6"
                        ></textarea>

                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">3. Tone & Style</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                            {["Professional", "Enthusiastic", "Confident", "Short & Direct"].map((tone) => (
                                <button
                                    key={tone}
                                    onClick={() => setSelectedTone(tone as Tone)}
                                    className={`font-medium py-2 rounded-lg text-xs transition-colors duration-200 ${selectedTone === tone
                                        ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-500 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-500 shadow-sm"
                                        : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                                        }`}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || applications.length === 0}
                            className={`w-full relative group overflow-hidden font-bold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 z-10 ${isGenerating ? "bg-gray-400 cursor-not-allowed text-white" : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-lg hover:-translate-y-0.5"
                                }`}
                        >
                            {!isGenerating && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>}

                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Generating Draft...</span>
                                </>
                            ) : generatedContent ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 group-hover:text-white transition-colors" />
                                    <span className="group-hover:text-white transition-colors">Regenerate Draft</span>
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-4 h-4 group-hover:text-white transition-colors" />
                                    <span className="group-hover:text-white transition-colors">Generate Draft</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Output Column */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generated Draft.docx</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownloadPDF}
                                disabled={!generatedContent}
                                className={`p-1.5 rounded-md transition-colors ${generatedContent
                                    ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50"
                                    : "text-gray-400 cursor-not-allowed"
                                    }`}
                                title="Download PDF"
                            >
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900/50 overflow-y-auto w-full flex justify-center">
                        {generatedContent ? (
                            // {/* Realistic Paper Outline */}
                            <div ref={pdfRef} className="bg-white dark:bg-gray-100 max-w-[600px] w-full p-8 rounded shadow-lg border border-gray-200 text-gray-800 text-sm leading-relaxed font-serif relative">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="font-bold">Alex Johnson</p>
                                            <p>123 Tech Lane | San Francisco, CA</p>
                                            <p>alex@example.com</p>
                                        </div>
                                        <div className="text-right">
                                            <p>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <p>Hiring Manager</p>
                                    <p className="font-bold">{activeTarget?.job?.companyName || 'Company'}</p>

                                    <div className="pt-4">
                                        <p className="whitespace-pre-wrap">{generatedContent}</p>
                                    </div>

                                    <div className="pt-8 mt-8">
                                        <p>Sincerely,</p>
                                        <p className="font-bold mt-4">Alex Johnson</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                    <FileText className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-sm font-medium">Select an application and generate a draft to preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
