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
        <section className="relative bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-8">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-xl">
                                {subtitle}
                            </p>
                        )}
                        {ctaText && (
                            <a
                            href="#contact"
                            className="inline-block bg-accent text-white font-medium px-8 py-4 rounded-lg hover:bg-accent-hover transition-colors"
                            >
                        {ctaText}
                            </a>
                            )}
                    </div>

                    {image && (
                        <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden">
                            <Image
                                src={urlFor(image).width(1200).height(1500).url()}
                                alt=""
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}