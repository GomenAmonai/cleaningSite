import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Клининг для организаций",
    description: "Профессиональная уборка офисов и коммерческих помещений в Москве",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-white text-ink font-sans">
                <div className="mx-auto w-full max-w-[1280px] flex flex-col min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
