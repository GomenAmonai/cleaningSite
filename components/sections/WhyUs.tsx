import { SectionHeading } from "@/components/ui/SectionHeading";

type Reason = {
    number: string;
    title: string;
    description: string;
};

// TODO: final copy from client
const REASONS: Reason[] = [
    {
        number: "01",
        title: "Договор и документы",
        description:
            "Заключаем официальный договор. Закрывающие документы для бухгалтерии.",
    },
    {
        number: "02",
        title: "Фиксированная цена",
        description:
            "Озвучиваем цену на этапе расчёта. Без доплат и пересчётов после уборки.",
    },
    {
        number: "03",
        title: "Свой персонал",
        description:
            "Не работаем через субподряд. Все сотрудники в штате, проверены и обучены.",
    },
    {
        number: "04",
        title: "Гибкий график",
        description:
            "Работаем в удобное вам время — днём, ночью, по выходным.",
    },
    {
        number: "05",
        title: "Профессиональная химия",
        description:
            "Используем сертифицированные средства, безопасные для людей и техники.",
    },
    {
        number: "06",
        title: "Гарантия результата",
        description:
            "Если что-то не устроило — переделаем бесплатно по гарантии договора.",
    },
];

export function WhyUs() {
    return (
        <section id="why-us" className="bg-ink py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    tone="dark"
                    // TODO: final copy from client
                    title="Почему мы"
                    // TODO: final copy from client
                    subtitle="Работаем прозрачно и по договору. Без скрытых платежей и сюрпризов."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {REASONS.map(({ number, title, description }) => (
                        <article
                            key={number}
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
