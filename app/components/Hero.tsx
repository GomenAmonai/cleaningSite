import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type HeroProps = {
    title: string;
    subtitle?: string;
    image?: { asset: { _ref: string; _type: string }; _type: string };
    ctaText?: string;
};

export function Hero({ title, subtitle, image, ctaText }: HeroProps) {
    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
            {image && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={urlFor(image).width(1920).height(1080).url()}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
                {ctaText && (
                    <a
                        href="#contact"
                        className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        {ctaText}
                    </a>
                )}
            </div>
        </section>
    );
}
