import type { Metadata } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
    variable: "--font-inter",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

const lora = Lora({
    variable: "--font-fraunces",
    subsets: ["latin", "cyrillic"],
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
        <html
            lang="ru"
            className={`${manrope.variable} ${lora.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        </body>
        </html>
    );
}