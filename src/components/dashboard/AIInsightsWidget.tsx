"use client";

import { Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function AIInsightsWidget() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-5 shadow-sm border border-indigo-500/30 group">
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-md border border-white/20">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                    </div>
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 uppercase tracking-wider">AI Resume Match</span>
                </div>

                <p className="text-sm text-indigo-100/90 leading-relaxed font-medium mb-4">
                    Based on your extracted skills (React, Node.js), your most competitive roles are <strong className="text-white">Full Stack Developer</strong> and <strong className="text-white">Frontend Engineer</strong>.
                </p>

                <Link href="/cover-letter" className="flex items-center gap-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-3 py-1.5 rounded-lg w-full justify-center">
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    Generate AI Cover Letter
                    <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
