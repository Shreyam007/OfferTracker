"use client";

import { getCompanyTheme } from "@/lib/company-icons";

interface CompanyLogoProps {
    companyName: string;
    className?: string;
    iconClassName?: string;
}

export function CompanyLogo({ companyName, className = "w-10 h-10", iconClassName = "w-5 h-5" }: CompanyLogoProps) {
    const { icon: Icon, color, bgColor } = getCompanyTheme(companyName);

    return (
        <div className={`${className} rounded-lg flex items-center justify-center shadow-sm border ${bgColor} transition-all duration-300`}>
            <Icon className={`${iconClassName} ${color}`} />
        </div>
    );
}
