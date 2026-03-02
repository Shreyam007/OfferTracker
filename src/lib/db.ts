import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Re-export types for backward compatibility
export type { Job, Application, User } from "@prisma/client";
export type OTP = {
    email: string;
    code: string;
    expiresAt: number;
};
