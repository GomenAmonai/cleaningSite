import { MessageSquareQuote, Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Review as SanityReview } from "@/sanity/lib/types";

type Props = {
    title?: string;
    subtitle?: string;
    reviews?: SanityReview[];
};

export function Reviews({ title, subtitle, reviews }: Props) {
    const hasReviews = reviews && reviews.length > 0;

    return (
        <section id="reviews" className="bg-cyan-light py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Отзывы"}
                    // TODO: final copy from client
                    subtitle={subtitle ?? "Что говорят наши клиенты."}
                />

                {hasReviews ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {reviews!.map((r) => (
                            <article
                                key={r._id}
                                className="bg-white rounded-lg p-6 md:p-8 shadow-sm"
                            >
                                {typeof r.rating === "number" && r.rating > 0 && (
                                    <div
                                        className="flex gap-1 mb-3"
                                        aria-label={`Рейтинг ${r.rating} из 5`}
                                    >
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={
                                                    i < r.rating!
                                                        ? "fill-cyan text-cyan"
                                                        : "text-ink/20"
                                                }
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                )}
                                <p className="text-ink/80 leading-relaxed whitespace-pre-line">
                                    {r.text}
                                </p>
                                <div className="mt-5 pt-4 border-t border-ink/10">
                                    <div className="font-semibold text-ink">
                                        {r.authorName}
                                    </div>
                                    {r.authorCompany && (
                                        <div className="text-sm text-ink/60">
                                            {r.authorCompany}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-ink/15 rounded-lg p-12 md:p-16 max-w-2xl mx-auto text-center bg-white/40">
                        <MessageSquareQuote
                            className="mx-auto text-ink/30"
                            size={48}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        {/* TODO: final copy from client */}
                        <p className="mt-5 text-ink/60">
                            Скоро здесь будут отзывы наших клиентов.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
