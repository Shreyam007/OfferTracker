"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { deleteApplication } from "@/app/actions/applications";
import { AddApplicationModal } from "./AddApplicationModal";
import { ApplicationWithJob } from "@/types/application";

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "APPLIED":
            return (
                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/20">
                    Applied
                </span>
            );
        case "INTERVIEW":
            return (
                <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-500 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/20">
                    Interview
                </span>
            );
        case "OFFER":
            return (
                <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/20">
                    Offer
                </span>
            );
        case "REJECTED":
            return (
                <span className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-600/10 dark:ring-red-500/20">
                    Rejected
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-600">
                    {status}
                </span>
            );
    }
}

export function RecentActivityTable({ applications }: { applications: ApplicationWithJob[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async (id: string) => {
        setIsDeleting(id);
        await deleteApplication(id);
        setIsDeleting(null);
        setOpenDropdownId(null);
    };

    return (
        <div className="mt-8">
            <AddApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Applications</h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        A list of your latest job applications, AI match scores, and current statuses.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Add Application
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 overflow-x-auto scrollbar-hide">
                    <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 dark:ring-white/10 rounded-lg border border-border dark:border-gray-700">
                            <div className="min-w-full overflow-x-auto scrollbar-hide">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-surface dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                                                Company & Role
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                                Date Applied
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                                AI Match
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                                Status
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50 bg-white dark:bg-gray-800">
                                        {applications.map((app) => (
                                            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="font-medium text-gray-900 dark:text-white">{app.job?.companyName || app.company}</div>
                                                    <div className="text-gray-500 dark:text-gray-400">{app.job?.role || app.role}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {app.appliedDate}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="flex items-center max-w-[120px]">
                                                        <span className="mr-2 text-xs font-semibold w-6 dark:text-gray-300">{app.aiMatchScore}%</span>
                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className="bg-primary h-1.5 rounded-full"
                                                                style={{ width: `${app.aiMatchScore}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <StatusBadge status={app.status} />
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="relative inline-block text-left" ref={openDropdownId === app.id ? dropdownRef : null}>
                                                        <button
                                                            onClick={() => setOpenDropdownId(openDropdownId === app.id ? null : app.id)}
                                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-transparent p-1 rounded-md"
                                                        >
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>

                                                        {openDropdownId === app.id && (
                                                            <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => handleDelete(app.id)}
                                                                        disabled={isDeleting === app.id}
                                                                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {isDeleting === app.id ? (
                                                                            <span className="w-4 h-4 mr-2 border-2 border-red-600/20 border-t-red-600 rounded-full animate-spin"></span>
                                                                        ) : (
                                                                            <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                                                        )}
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
