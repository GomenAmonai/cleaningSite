type FaqItem = {
    question: string;
    answer: string;
};

type FaqProps = {
    title?: string;
    items?: FaqItem[];
};

export function Faq({ title, items }: FaqProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-background border-t border-border">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 py-24">
                <h2 className="font-serif text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-16">
                    {title || "Частые вопросы"}
                </h2>

                <div className="flex flex-col">
                    {items.map((item, index) => (
                        <details
                            key={index}
                            className="group border-t border-border last:border-b py-6"
                        >
                            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                                <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                                    {item.question}
                                </h3>
                                <span className="font-serif text-2xl text-gold leading-none pt-1 transition-transform duration-300 group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="text-muted leading-relaxed mt-4 pr-12">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}