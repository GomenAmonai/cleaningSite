"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Slide = {
    title: string;
    body: string;
    /** TODO: replace with next/image once /public/placeholders/about-N.jpg lands */
    placeholderClass: string;
};

// TODO: final copy from client
const SLIDES: Slide[] = [
    {
        title: "Опыт работы",
        body: "Более 5 лет на рынке клининга. Команда обученных специалистов с опытом работы в крупных бизнес-центрах.",
        placeholderClass: "bg-ink/80",
    },
    {
        title: "Современное оборудование",
        body: "Профессиональная техника и сертифицированная химия. Безопасно для сотрудников и посетителей.",
        placeholderClass: "bg-cyan/70",
    },
    {
        title: "Гибкий график",
        body: "Работаем в удобное для вас время — днём, ночью, по выходным. Не мешаем рабочему процессу.",
        placeholderClass: "bg-ink/70",
    },
    {
        title: "Договор и отчётность",
        body: "Официальный договор, закрывающие документы, прозрачная цена. Без скрытых платежей.",
        placeholderClass: "bg-cyan/60",
    },
];

export function About() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
    const [selected, setSelected] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelected(emblaApi.selectedScrollSnap());
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
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
                    {/* TODO: final copy from client */}
                    <h2 className="text-3xl md:text-4xl font-semibold text-ink">
                        О компании
                    </h2>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {SLIDES.map((slide, i) => (
                                <div
                                    key={i}
                                    className="flex-[0_0_100%] min-w-0 px-1"
                                >
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-white rounded-xl overflow-hidden shadow-sm">
                                        {/* TODO: replace placeholder div with next/image using /public/placeholders/about-{i+1}.jpg */}
                                        <div
                                            className={`order-1 md:order-2 aspect-[4/3] md:aspect-auto md:h-full min-h-[260px] ${slide.placeholderClass}`}
                                            aria-hidden="true"
                                        />
                                        <div className="order-2 md:order-1 p-8 md:p-12">
                                            <div
                                                className="h-1 w-10 bg-cyan rounded-full mb-5"
                                                aria-hidden="true"
                                            />
                                            {/* TODO: final copy from client */}
                                            <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-4">
                                                {slide.title}
                                            </h3>
                                            {/* TODO: final copy from client */}
                                            <p className="text-ink/75 leading-relaxed">
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
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollTo(i)}
                            aria-label={`Перейти к слайду ${i + 1}`}
                            aria-current={selected === i}
                            className={`h-2.5 rounded-full transition-all ${
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
