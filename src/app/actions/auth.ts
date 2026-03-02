"use server";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";

export async function generateAndSendOTP(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    try {
        // Cleanup old OTPs for this email
        await prisma.oTP.deleteMany({ where: { email } });

        // Add new OTP
        await prisma.oTP.create({
            data: {
                email,
                code,
                expiresAt: BigInt(expiresAt),
            }
        });

        console.log(`[AUTH] Generated OTP for ${email}: ${code}`);
    } catch (dbError) {
        console.error("[AUTH] Database error creating OTP:", dbError);
        return { success: false, error: "Failed to connect to database. Please try again." };
    }

    try {
        if (!resend) {
            console.error("[AUTH] RESEND_API_KEY is missing in environment variables.");
            return { success: false, error: "Server Configuration Error: Add RESEND_API_KEY to Vercel." };
        }

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Enforce default to prevent 403 on unverified Vercel domains
            to: email,
            subject: 'Your OfferTrack Verification Code',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #10b981;">Verify your identity</h2>
                    <p>Use the following code to complete your login to OfferTrack:</p>
                    <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #111;">
                        ${code}
                    </div>
                    <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #999;">If you didn't request this code, you can safely ignore this email.</p>
                </div>
            `
        });

        if (error) {
            console.error("[AUTH] Resend error:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error("[AUTH] Unexpected error sending email:", err);
        return { success: false, error: "Failed to send email. Please try again later." };
    }
}
