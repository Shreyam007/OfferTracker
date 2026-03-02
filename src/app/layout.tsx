"use client";

import { useState } from "react";

import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { usePathname } from "next/navigation";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { SettingsProvider } from "@/hooks/useSettings";
import PreLoader from "@/components/common/PreLoader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900`}>
        <NextAuthProvider>
          <SettingsProvider>
            <PreLoader />
            {!isLoginPage && (
              <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            )}
            <div className="flex flex-col flex-1 overflow-hidden relative">
              {!isLoginPage && (
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
              )}
              <main className={`flex-1 overflow-y-auto ${!isLoginPage ? 'p-4 md:p-6 lg:p-8' : ''}`}>
                {children}
              </main>
            </div>
          </SettingsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
