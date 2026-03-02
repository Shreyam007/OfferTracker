"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud, CheckCircle2, Briefcase, Code } from "lucide-react";

export function ResumeUploadZone() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [parsedData, setParsedData] = useState<{
        skills: string[];
        experience: { role: string; company: string; duration: string }[];
    } | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setIsUploading(true);
            setParsedData(null); // Reset previous data

            try {
                // Prepare FormData to send the file to the backend
                const formData = new FormData();
                formData.append("file", selectedFile);

                // Call the actual PDF parser API
                const response = await fetch('/api/parse-resume', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.details || errorData.error || "Failed to parse resume");
                }

                const result = await response.json();

                if (result.success && result.data) {
                    setParsedData({
                        skills: result.data.skills,
                        experience: result.data.experience.length > 0
                            ? result.data.experience
                            : [{ role: "Experience Extraction", company: "Could not map to standard format", duration: "Manual Review Required" }]
                    });
                }
            } catch (error: unknown) {
                console.error("Resume parsing error:", error);
                // Fallback if API fails
                setParsedData({
                    skills: [`Error: ${error instanceof Error ? error.message : "Please check your PDF."}`],
                    experience: []
                });
            } finally {
                setIsUploading(false);
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        maxSize: 10485760, // 10MB
    });

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Resume</label>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-emerald-500 bg-emerald-50" :
                    file ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 dark:border-gray-700 dark:hover:bg-emerald-900/10 dark:hover:border-emerald-500"
                    }`}
            >
                <input {...getInputProps()} />

                {file ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        {isUploading ? (
                            <>
                                <div className="h-10 w-10 text-emerald-500 animate-pulse">
                                    <UploadCloud className="w-full h-full" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Parsing {file.name}...</p>
                                    <p className="text-xs text-gray-500 mt-1">Extracting keywords for AI matching</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="h-10 w-10 text-emerald-500 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                                    <p className="text-xs text-emerald-600 font-medium mt-1">Resume active & parsed</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); setParsedData(null); }}
                                    className="text-xs text-gray-400 hover:text-red-500 mt-2 underline transition-colors"
                                >
                                    Remove file
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="h-10 w-10 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center transition-colors">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                                PDF, DOCX up to 10MB
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Extracted Data Section */}
            {parsedData && !isUploading && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent flex-1"></div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">AI Extract Results</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Skills Box */}
                        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Code className="w-5 h-5 text-indigo-500" />
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Extracted Skills</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {parsedData.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-800/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Experience Box */}
                        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-5 h-5 text-amber-500" />
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Experience Timeline</h4>
                            </div>
                            <div className="space-y-4">
                                {parsedData.experience.map((exp, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-50 dark:ring-amber-900/20"></div>
                                            {index !== parsedData.experience.length - 1 && (
                                                <div className="w-px h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{exp.role}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{exp.company}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{exp.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
