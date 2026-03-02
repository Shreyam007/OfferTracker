"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getApplications() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session.user as any).id;

    return prisma.application.findMany({
        where: { userId },
        include: { job: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function createApplication(
    jobData: { companyName: string; role: string; location?: string; salaryRange?: string; description?: string; source?: string; matchScore?: number },
    status: string = "APPLIED"
) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Not authenticated");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session.user as any).id;

    // Create job entry
    const newJob = await prisma.job.create({
        data: {
            companyName: jobData.companyName,
            role: jobData.role,
            location: jobData.location,
            salaryRange: jobData.salaryRange,
            description: jobData.description,
            source: jobData.source,
            matchScore: jobData.matchScore,
        }
    });

    // Create application entry
    const newApp = await prisma.application.create({
        data: {
            userId,
            jobId: newJob.id,
            status,
            appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            aiMatchScore: jobData.matchScore || Math.floor(Math.random() * (95 - 70 + 1) + 70),
        }
    });

    revalidatePath('/');
    revalidatePath('/applications');
    return newApp;
}

export async function updateApplicationStatus(id: string, status: string) {
    const app = await prisma.application.update({
        where: { id },
        data: { status },
    });
    revalidatePath('/');
    revalidatePath('/applications');
    return app;
}

export async function updateApplicationNotes(id: string, notes: string) {
    const app = await prisma.application.update({
        where: { id },
        data: { notes },
    });
    revalidatePath(`/applications/${id}`);
    return app;
}

export async function deleteApplication(id: string) {
    await prisma.application.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/applications');
    return true;
}
