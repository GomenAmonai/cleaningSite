type WhyUsItem = {
    title: string;
    description: string;
};

type WhyUsProps = {
    title?: string;
    items?: WhyUsItem[];
};

export function WhyUs({ title, items }: WhyUsProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-background border-t border-border">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
                <h2 className="font-serif text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-16 max-w-2xl">
                    {title || "Почему выбирают нас"}
                </h2>

                <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-6">
                            <span className="font-serif text-3xl text-gold leading-none pt-1 tabular-nums">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="font-serif text-2xl font-medium text-foreground tracking-tight mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}