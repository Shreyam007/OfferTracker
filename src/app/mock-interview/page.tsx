import { BrainCircuit, Mic, FileAudio, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { getApplications } from "@/app/actions/applications";

export default async function MockInterviewPage() {
    const applications = await getApplications();
    return (
        <div className="flex flex-col h-full overflow-y-auto pr-2 pb-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    <BrainCircuit className="w-8 h-8 text-indigo-500" />
                    AI Mock Interview
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                    Practice your technical and behavioral skills with our state-of-the-art AI interviewer. Based on the Google Frontend Engineer role you tracked.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Camera / AI Visualizer Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative w-full aspect-video bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl flex items-center justify-center">
                        {/* Glowing AI Orb Effect */}
                        <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-[pulse_4s_infinite]"></div>
                        <div className="absolute w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-[pulse_3s_infinite_reverse]"></div>

                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full border-2 border-indigo-500/50 flex items-center justify-center relative bg-gray-800/50 backdrop-blur-md">
                                <Mic className="w-8 h-8 text-indigo-400" />
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-20"></div>
                            </div>
                            <p className="text-white font-medium tracking-widest text-sm bg-black/50 px-4 py-1.5 rounded-full border border-gray-700">
                                AI Interviewer is analyzing your response...
                            </p>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-semibold text-gray-400">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Recording</span>
                            <span>02:14</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Live Transcript</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">AI</div>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-r-xl rounded-bl-xl p-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                                    That sounds like a great approach to managing state. Could you elaborate on how you would handle race conditions in that specific React architecture?
                                </div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">YOU</div>
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-l-xl rounded-br-xl p-3 text-sm text-gray-800 dark:text-gray-200 border border-emerald-100 dark:border-emerald-800/30">
                                    Sure, to handle race conditions, I would typically utilize an AbortController in the useEffect hook to cancel the previous fetch request if a new one is triggered before the first resolves.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings / Actions */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-b from-indigo-500 to-purple-600 rounded-2xl p-1 shadow-lg">
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 h-full">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-indigo-500" />
                                Interview Settings
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Target Role</label>
                                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-white font-medium">
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
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Interview Type</label>
                                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-white font-medium">
                                        <option>Technical (React & TS)</option>
                                        <option>Behavioral (STAR Method)</option>
                                        <option>System Design</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Difficulty</label>
                                    <div className="flex bg-gray-50 dark:bg-gray-800 rounded-md p-1 border border-gray-200 dark:border-gray-700">
                                        <button className="flex-1 text-xs py-1.5 font-medium rounded text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition">Easy</button>
                                        <button className="flex-1 text-xs py-1.5 font-medium rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-600 transition">Medium</button>
                                        <button className="flex-1 text-xs py-1.5 font-medium rounded text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition">Hard</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                                <Link href="/" className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm shadow-red-500/20 text-center block">
                                    End Interaction
                                </Link>
                                <Link href="/" className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-semibold rounded-lg text-sm transition-colors text-center flex items-center justify-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Return to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-4 flex gap-3">
                        <FileAudio className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium leading-relaxed">
                            Your session is being analyzed in real-time. Once completed, you will receive a detailed PDF breakdown scoring your communication, technical accuracy, and cadence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
