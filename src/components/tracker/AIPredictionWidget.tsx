"use client";

import { Bot, Sparkles, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface AIPredictionWidgetProps {
    score: number;
    tip: string;
}

export function AIPredictionWidget({ score, tip }: AIPredictionWidgetProps) {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let scoreLabel = "Match";
    let scoreColor = "text-emerald-400";
    if (score >= 90) {
        scoreLabel = "Exceptional Match";
        scoreColor = "text-emerald-400";
    } else if (score >= 80) {
        scoreLabel = "High Match";
        scoreColor = "text-blue-400";
    } else if (score >= 70) {
        scoreLabel = "Good Match";
        scoreColor = "text-amber-400";
    } else {
        scoreLabel = "Fair Match";
        scoreColor = "text-rose-400";
    }

    // Mock breakdown based on score
    const breakdown = [
        { label: "Skills Alignment", value: Math.min(100, score + 5), color: "bg-emerald-500" },
        { label: "Experience Level", value: Math.min(100, score - 2), color: "bg-indigo-500" },
        { label: "Location Fit", value: 100, color: "bg-blue-500" },
    ];

    const improvements = [
        "Add keywords: 'TypeScript', 'Next.js 14', 'Tailwind CSS'",
        "Emphasize 'Server Actions' experience in summary",
        "Quantify achievements in previous Frontend Role"
    ];

    return (
        <div className="bg-[#0f172a]/95 backdrop-blur-xl rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
            {/* Animated Glow Effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] group-hover:bg-indigo-600/30 transition-all duration-700" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-600/20 transition-all duration-700" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                        <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
                        <span className="text-xs font-black tracking-[0.2em] text-white/90">AI ANALYSIS v2.0</span>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-400 opacity-50" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                    <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0 group/gauge">
                        <svg className="transform -rotate-90 w-32 h-32">
                            <circle
                                cx="64" cy="64" r={radius}
                                stroke="rgba(255,255,255,0.05)" strokeWidth="10"
                                fill="transparent"
                            />
                            <circle
                                cx="64" cy="64" r={radius}
                                stroke="currentColor" strokeWidth="10"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className={`${scoreColor} transition-all duration-1500 ease-out drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black">{score}%</span>
                            <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Score</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className={`text-3xl font-black mb-2 ${scoreColor}`}>{scoreLabel}</h3>
                        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                            Our proprietary LLM analyzed your profile against the job description for deep compatibility.
                        </p>
                    </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {breakdown.map((item) => (
                        <div key={item.label} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">{item.label}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-white/80">{item.value}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actionable Insights */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">What to edit for 100%</h4>
                    </div>
                    <ul className="space-y-4">
                        {improvements.map((insight, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1 bg-emerald-500/20 p-1 rounded-full">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                </div>
                                <span className="text-sm text-white/80 font-medium">{insight}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* dynamic tip */}
                <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                    <p className="text-xs text-indigo-200/80 italic font-medium">
                        &quot;{tip}&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
