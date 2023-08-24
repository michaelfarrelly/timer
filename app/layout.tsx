import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { BottomBar } from "./bottombar";
import { Providers } from "./providers";
import { TitleBar } from "./titlebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Timer",
    description: "Created by Michael Farrelly"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Providers>
                    <TitleBar />
                    {children}
                    <BottomBar />
                </Providers>
            </body>
        </html>
    );
}
