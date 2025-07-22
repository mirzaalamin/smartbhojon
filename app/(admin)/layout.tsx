import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/admin/layout/Sidebar";
import Header from "@/components/admin/layout/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bhojon | Smart Restaurant Management System",
    description: "Bhojon is an all-in-one restaurant management solution for modern dining. Manage orders, menu, kitchen, payments, customers, and staff — all from one elegant dashboard.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <h2>Hello</h2>
                {children} */}

                <div className="min-h-screen bg-[#FFFCF1] flex">
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                        <Header />
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
