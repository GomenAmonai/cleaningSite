"use client";

import Image from "next/image";

import { useContactModal } from "@/components/providers/ModalProvider";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    heroImage?: SiteSettings["heroImage"];
};

export function Hero({ title, subtitle, ctaLabel, heroImage }: Props) {
    const { openContactModal } = useContactModal();
    const imageSrc = heroImage
        ? urlFor(heroImage).width(1920).quality(80).url()
        : "/hero.jpg";

    return (
        <section
            id="hero"
            className="relative isolate min-h-[500px] md:min-h-[600px] flex items-center"
        >
            {/* Solid fallback — visible before image loads */}
            <div className="absolute inset-0 -z-30 bg-ink" aria-hidden="true" />

            {/* Background image — Sanity heroImage or /public/hero.jpg */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                    src={imageSrc}
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                    aria-hidden="true"
                />
            </div>

            {/* Dark overlay — bg-black/[.52] keeps white text ≥ 4.5:1 WCAG AA */}
            <div className="absolute inset-0 -z-10 bg-black/[.52]" aria-hidden="true" />

            <div className="w-full px-6 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                        {/* TODO: final copy from client (fallback below) */}
                        {title ?? "Профессиональная уборка для бизнеса в Москве"}
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
                        {/* TODO: final copy from client (fallback below) */}
                        {subtitle ??
                            "Офисы, помещения, послестроительная уборка. Работаем по договору, оплата по факту."}
                    </p>

                    <div className="mt-10">
                        <button
                            type="button"
                            onClick={openContactModal}
                            className="inline-flex items-center justify-center bg-cyan hover:bg-cyan/85 text-white font-semibold px-8 py-4 rounded-md transition-colors"
                        >
                            {/* TODO: final copy from client (fallback below) */}
                            {ctaLabel ?? "Оставить заявку"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
