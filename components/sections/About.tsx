"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { AboutSlide } from "@/sanity/lib/types";

type DisplaySlide = {
    title: string;
    body: string;
    imageUrl?: string;
    stat?: string;
    statLabel?: string;
};

// TODO: final copy from client — used only when Sanity returns no slides
const FALLBACK_SLIDES: DisplaySlide[] = [
    {
        title: "Опыт работы",
        body: "Более 5 лет на рынке клининга. Команда обученных специалистов с опытом работы в крупных бизнес-центрах.",
        stat: "5+",
        statLabel: "лет на рынке",
    },
    {
        title: "Современное оборудование",
        body: "Профессиональная техника и сертифицированная химия. Безопасно для сотрудников и посетителей.",
        stat: "100%",
        statLabel: "сертифицированная химия",
    },
    {
        title: "Гибкий график",
        body: "Работаем в удобное для вас время — днём, ночью, по выходным. Не мешаем рабочему процессу.",
        stat: "24/7",
        statLabel: "без выходных",
    },
    {
        title: "Договор и отчётность",
        body: "Официальный договор, закрывающие документы, прозрачная цена. Без скрытых платежей.",
        stat: "0 ₽",
        statLabel: "скрытых платежей",
    },
];

type Props = {
    title?: string;
    slides?: AboutSlide[];
};
export function About({ title, slides }: Props) {
    const display: DisplaySlide[] =
        slides && slides.length > 0
            ? slides.map((s) => ({
                  title: s.title,
                  body: s.body,
                  imageUrl: s.image
                      ? urlFor(s.image).width(900).height(700).url()
                      : undefined,
              }))
            : FALLBACK_SLIDES;

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", duration: 22 });
    const [selected, setSelected] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelected(emblaApi.selectedScrollSnap());
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(); // sync immediately on mount
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (i: number) => emblaApi?.scrollTo(i),
        [emblaApi]
    );
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <section id="about" className="bg-cyan-light py-20 md:py-28">
            <div className="px-6">
                <div className="text-center mb-12 md:mb-16">
                    <div
                        className="mx-auto h-1 w-12 bg-cyan rounded-full mb-5"
                        aria-hidden="true"
                    />
                    <h2 className="text-3xl md:text-4xl font-semibold text-ink">
                        {title ?? "О компании"}
                    </h2>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {display.map((slide, i) => (
                                <div
                                    key={i}
                                    className="flex-[0_0_100%] min-w-0 px-1"
                                >
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-white rounded-xl overflow-hidden shadow-sm">
                                        <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px]">
                                            {slide.imageUrl ? (
                                                <Image
                                                    src={slide.imageUrl}
                                                    alt={slide.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-ink flex flex-col items-center justify-center gap-3" aria-hidden="true">
                                                    <span className="text-6xl md:text-7xl font-semibold text-cyan leading-none">
                                                        {slide.stat ?? ""}
                                                    </span>
                                                    {slide.statLabel && (
                                                        <span className="text-sm md:text-base text-white/60 tracking-wide uppercase">
                                                            {slide.statLabel}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="order-2 md:order-1 p-8 md:p-12">
                                            <div
                                                className="h-1 w-10 bg-cyan rounded-full mb-5"
                                                aria-hidden="true"
                                            />
                                            <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-4">
                                                {slide.title}
                                            </h3>
                                            <p className="text-ink/75 leading-relaxed whitespace-pre-line">
                                                {slide.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canPrev}
                        aria-label="Предыдущий слайд"
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center text-ink hover:text-cyan disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canNext}
                        aria-label="Следующий слайд"
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center text-ink hover:text-cyan disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {display.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollTo(i)}
                            aria-label={`Перейти к слайду ${i + 1}`}
                            aria-current={selected === i}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                selected === i
                                    ? "w-8 bg-cyan"
                                    : "w-2.5 bg-ink/30 hover:bg-ink/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
