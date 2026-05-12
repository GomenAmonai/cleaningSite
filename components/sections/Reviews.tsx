import { MessageSquareQuote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews() {
    return (
        <section id="reviews" className="bg-cyan-light py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client
                    title="Отзывы"
                    // TODO: final copy from client
                    subtitle="Что говорят наши клиенты."
                />

                <div className="border border-dashed border-ink/15 rounded-lg p-12 md:p-16 max-w-2xl mx-auto text-center bg-white/40">
                    <MessageSquareQuote
                        className="mx-auto text-ink/30"
                        size={48}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {/* TODO: final copy from client — replace with Sanity-driven reviews in block 5 */}
                    <p className="mt-5 text-ink/60">
                        Скоро здесь будут отзывы наших клиентов.
                    </p>
                </div>
            </div>
        </section>
    );
}
