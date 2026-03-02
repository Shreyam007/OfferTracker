"use client";

import { useState } from "react";
import { Chrome, Linkedin, Mail, Lock, ArrowRight, Sparkles, ShieldCheck, User as UserIcon, CheckCircle, ChevronLeft, Phone, KeyRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { generateAndSendOTP } from "@/app/actions/auth";

type AuthView = "login" | "register" | "forgot" | "otp" | "social-connecting" | "success";

export default function LoginPage() {
    const [view, setView] = useState<AuthView>("login");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [socialProvider, setSocialProvider] = useState<"Google" | "LinkedIn" | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            if (result?.error) {
                setError("Invalid email or password.");
                setIsLoading(false);
            } else {
                window.location.href = "/";
            }
        } catch (err) {
            console.error("Sign in error:", err);
            setError("An unexpected error occurred during sign in.");
            setIsLoading(false);
        }
    };

    const handleSocialAuth = (provider: "Google" | "LinkedIn") => {
        setSocialProvider(provider);
        setView("social-connecting");
        signIn(provider.toLowerCase(), { callbackUrl: "/" });
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await generateAndSendOTP(email);
            if (result.success) {
                setView("otp");
            } else {
                setError(result.error || "Failed to send OTP");
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const code = otp.join("");

        const result = await signIn("credentials", {
            email,
            code,
            redirect: false,
            callbackUrl: "/",
        });

        if (result?.error) {
            setError("Invalid or expired OTP code.");
            setIsLoading(false);
        } else {
            setView("success");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        // Only take the last character typed (handles overwrite)
        const digit = value.slice(-1);
        if (digit && !/^[0-9]$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Auto-focus next input
        if (digit && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted) {
            const newOtp = [...otp];
            for (let i = 0; i < 6; i++) {
                newOtp[i] = pasted[i] || "";
            }
            setOtp(newOtp);
            // Focus the next empty or last input
            const focusIndex = Math.min(pasted.length, 5);
            document.getElementById(`otp-${focusIndex}`)?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col lg:flex-row overflow-hidden font-inter transition-colors">
            {/* Left Side: Visual/Branding (Persistent) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-indigo-600 to-primary dark:from-emerald-900 dark:via-indigo-900 dark:to-emerald-800 p-12 flex-col justify-between relative overflow-hidden transition-all duration-700">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                        <Sparkles className="w-6 h-6 text-primary fill-primary/20" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter">OfferTrack</span>
                </div>

                <div className="relative z-10">
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        {view === "register" ? "Start your journey" : "Welcome back"} <br />
                        <span className="text-emerald-300">to professional tracking.</span>
                    </h1>
                    <p className="text-xl text-emerald-50/80 max-w-md font-medium leading-relaxed">
                        The only AI-powered platform designed for high-performing tech professionals.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center text-[10px] font-bold text-white">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-white/70 tracking-wide uppercase">
                        Preferred by top talent
                    </p>
                </div>
            </div>

            {/* Right Side: Dynamic Content */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 bg-gray-50/50 dark:bg-gray-900/50 relative overflow-y-auto">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

                    {/* View: SOCIAL CONNECTING OVERLAY */}
                    {view === "social-connecting" && (
                        <div className="text-center space-y-6 py-12">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 rounded-full border-4 border-emerald-100 dark:border-emerald-900/40 animate-pulse"></div>
                                <div className="absolute inset-0 rounded-full border-t-4 border-emerald-500 animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {socialProvider === "Google" ? <Chrome className="w-10 h-10 text-rose-500" /> : <Linkedin className="w-10 h-10 text-[#0A66C2] dark:text-[#2882db]" />}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Connecting to {socialProvider}</h2>
                                <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">Please wait while we secure your session...</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                        </div>
                    )}

                    {/* View: LOGIN */}
                    {view === "login" && (
                        <>
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
                                <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">Enter your credentials to access your tracker</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => handleSocialAuth("Google")} className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/50 hover:shadow-lg transition-all group active:scale-95">
                                    <Chrome className="w-5 h-5 text-rose-500" /> Google
                                </button>
                                <button onClick={() => handleSocialAuth("LinkedIn")} className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-blue-500/30 dark:hover:border-blue-500/50 hover:shadow-lg transition-all group active:scale-95">
                                    <Linkedin className="w-5 h-5 text-[#0A66C2] dark:text-[#2882db]" /> LinkedIn
                                </button>
                            </div>

                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                                <span className="bg-gray-50/50 dark:bg-gray-900 px-3 relative z-10">Or use your email</span>
                            </div>

                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="name@company.com" />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 block">Password</label>
                                            <button type="button" onClick={() => setView("forgot")} className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 uppercase tracking-wider">Forgot Password?</button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full h-14 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl shadow-xl text-sm font-black transition-all group active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white dark:border-gray-900/20 dark:border-t-gray-900 rounded-full animate-spin"></div> : <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>
                            <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400">Don&apos;t have an account? <button onClick={() => setView("register")} className="text-emerald-600 dark:text-emerald-400 font-black">Create Account</button></p>
                        </>
                    )}

                    {/* View: REGISTER */}
                    {view === "register" && (
                        <>
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
                                <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">Join the elite network of job seekers</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => handleSocialAuth("Google")} className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/50 hover:shadow-lg transition-all group active:scale-95">
                                    <Chrome className="w-5 h-5 text-rose-500" /> Google
                                </button>
                                <button onClick={() => handleSocialAuth("LinkedIn")} className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-blue-500/30 dark:hover:border-blue-500/50 hover:shadow-lg transition-all group active:scale-95">
                                    <Linkedin className="w-5 h-5 text-[#0A66C2] dark:text-[#2882db]" /> LinkedIn
                                </button>
                            </div>

                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                                <span className="bg-gray-50/50 dark:bg-gray-900 px-3 relative z-10">Or use your email</span>
                            </div>

                            <form className="space-y-5" onSubmit={handleLogin}>
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="Alex Morgan" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="name@company.com" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="••••••••" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl text-sm font-black transition-all active:scale-95">Get Started</button>
                            </form>
                            <button onClick={() => setView("login")} className="w-full flex justify-center items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><ChevronLeft className="w-3 h-3" /> Back to Login</button>
                        </>
                    )}

                    {/* View: FORGOT PASSWORD */}
                    {view === "forgot" && (
                        <>
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Forgot Password?</h2>
                                <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">Enter your email or mobile to receive an OTP</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleForgotPassword}>
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Email or Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                                        <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm" placeholder="alex.morgan@email.com" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full h-14 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl shadow-xl text-sm font-black transition-all flex items-center justify-center">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white dark:border-gray-900/20 dark:border-t-gray-900 rounded-full animate-spin"></div> : "Send OTP"}
                                </button>
                            </form>
                            <button onClick={() => setView("login")} className="w-full flex justify-center items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><ChevronLeft className="w-3 h-3" /> Back to Login</button>
                        </>
                    )}

                    {/* View: OTP VERIFICATION */}
                    {view === "otp" && (
                        <>
                            <div className="text-center lg:text-left">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                                    <KeyRound className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Verify Identity</h2>
                                <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">We&apos;ve sent a code to your registered email.</p>
                            </div>

                            <form className="space-y-8" onSubmit={handleVerifyOtp}>
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={2}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            onPaste={handleOtpPaste}
                                            className="w-full h-16 text-center text-xl font-black bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                                        />
                                    ))}
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl text-sm font-black transition-all flex items-center justify-center">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : "Verify Code"}
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500">Didn&apos;t receive code? <button type="button" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">Resend Code</button></p>
                                </div>
                            </form>
                        </>
                    )}

                    {/* View: SUCCESS STATE */}
                    {view === "success" && (
                        <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                            <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-even-emerald">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Access Restored</h2>
                            <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400 mb-8">Your identity has been verified successfully.</p>
                            <button onClick={() => setView("login")} className="w-full h-14 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl shadow-xl text-sm font-black transition-all active:scale-95">Go to Login</button>
                        </div>
                    )}

                    {/* Footer Info (Persistent except connecting) */}
                    {view !== "social-connecting" && (
                        <div className="mt-8 p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-emerald-800/50 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-500 leading-tight">
                                Your data is protected by industry-standard encryption. Secure by default.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
