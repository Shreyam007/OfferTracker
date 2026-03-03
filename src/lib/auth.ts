import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                code: { label: "OTP Code", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;

                let user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                // Case 1: OTP Login
                if (credentials.code) {
                    const otp = await prisma.oTP.findFirst({
                        where: {
                            email: credentials.email,
                            code: credentials.code,
                        }
                    });

                    if (!otp || Number(otp.expiresAt) < Date.now()) return null;

                    // Remove used OTP
                    await prisma.oTP.delete({ where: { id: otp.id } });

                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                email: credentials.email,
                                name: credentials.email.split("@")[0],
                            }
                        });
                    }
                }
                // Case 2: Password Login
                else if (credentials.password) {
                    if (user) {
                        if (!user.password) return null;
                        const isValid = await bcrypt.compare(credentials.password, user.password);
                        if (!isValid) return null;
                    } else {
                        // Registration flow via UI
                        const hashedPassword = await bcrypt.hash(credentials.password, 10);
                        user = await prisma.user.create({
                            data: {
                                email: credentials.email,
                                name: credentials.email.split("@")[0],
                                password: hashedPassword
                            }
                        });
                    }
                }
                else {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (session.user as any).id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
