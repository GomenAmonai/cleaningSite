import { SectionHeading } from "@/components/ui/SectionHeading";
import type { WhyUsCard as SanityWhyUsCard } from "@/sanity/lib/types";

type DisplayReason = {
    key: string;
    number: string;
    title: string;
    description: string;
};

// TODO: final copy from client — used only when Sanity returns no cards
const FALLBACK_REASONS: DisplayReason[] = [
    {
        key: "01",
        number: "01",
        title: "Договор и документы",
        description:
            "Заключаем официальный договор. Закрывающие документы для бухгалтерии.",
    },
    {
        key: "02",
        number: "02",
        title: "Фиксированная цена",
        description:
            "Озвучиваем цену на этапе расчёта. Без доплат и пересчётов после уборки.",
    },
    {
        key: "03",
        number: "03",
        title: "Свой персонал",
        description:
            "Не работаем через субподряд. Все сотрудники в штате, проверены и обучены.",
    },
    {
        key: "04",
        number: "04",
        title: "Гибкий график",
        description: "Работаем в удобное вам время — днём, ночью, по выходным.",
    },
    {
        key: "05",
        number: "05",
        title: "Профессиональная химия",
        description:
            "Используем сертифицированные средства, безопасные для людей и техники.",
    },
    {
        key: "06",
        number: "06",
        title: "Гарантия результата",
        description:
            "Если что-то не устроило — переделаем бесплатно по гарантии договора.",
    },
];

type Props = {
    title?: string;
    subtitle?: string;
    cards?: SanityWhyUsCard[];
};

export function WhyUs({ title, subtitle, cards }: Props) {
    const display: DisplayReason[] =
        cards && cards.length > 0
            ? cards.map((c) => ({
                  key: c._id,
                  number: c.number,
                  title: c.title,
                  description: c.description ?? "",
              }))
            : FALLBACK_REASONS;

    return (
        <section id="why-us" className="bg-ink py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    tone="dark"
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Почему мы"}
                    // TODO: final copy from client
                    subtitle={
                        subtitle ??
                        "Работаем прозрачно и по договору. Без скрытых платежей и сюрпризов."
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {display.map(({ key, number, title, description }) => (
                        <article
                            key={key}
                            className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-lg"
                        >
                            <div className="text-cyan text-4xl font-semibold">
                                {number}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-white">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-white/70 leading-relaxed">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
