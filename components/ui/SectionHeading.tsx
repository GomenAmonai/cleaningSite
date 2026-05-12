import type { ReactNode } from "react";

type Props = {
    title: ReactNode;
    subtitle?: ReactNode;
    /** Use `dark` on sections with a dark background (e.g. WhyUs on bg-ink). */
    tone?: "light" | "dark";
};

export function SectionHeading({ title, subtitle, tone = "light" }: Props) {
    const titleColor = tone === "dark" ? "text-white" : "text-ink";
    const subtitleColor = tone === "dark" ? "text-white/70" : "text-ink/70";

    return (
        <div className="text-center mb-12 md:mb-16">
            <div
                className="mx-auto h-1 w-12 bg-cyan rounded-full mb-5"
                aria-hidden="true"
            />
            <h2 className={`text-3xl md:text-4xl font-semibold ${titleColor}`}>
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-4 max-w-2xl mx-auto text-base ${subtitleColor}`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
