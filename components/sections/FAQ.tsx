import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem as SanityFaqItem } from "@/sanity/lib/types";

type DisplayItem = {
    key: string;
    q: string;
    a: string;
};

// TODO: final copy from client — used only when Sanity returns no items
const FALLBACK_ITEMS: DisplayItem[] = [
    {
        key: "price",
        q: "Сколько стоит уборка?",
        a: "Цена зависит от площади помещения, типа уборки и периодичности. Базовая ставка — от 80 ₽/м². Точную стоимость рассчитываем после выезда на объект, выезд бесплатный.",
    },
    {
        key: "contract",
        q: "Заключаете ли вы договор?",
        a: "Да, работаем только по договору. Предоставляем закрывающие документы — акты выполненных работ, счета, счёт-фактуры. Работаем с НДС и без НДС.",
    },
    {
        key: "payment",
        q: "Какие способы оплаты вы принимаете?",
        a: "Безналичный расчёт на расчётный счёт юридического лица или ИП, наличный расчёт для физических лиц. Возможна оплата по факту выполнения работ или по предоплате.",
    },
    {
        key: "schedule",
        q: "Работаете ли вы по выходным и в ночное время?",
        a: "Да, график работы согласовываем индивидуально. Можем работать днём, ночью, в выходные и праздничные дни без доплат за нестандартное время.",
    },
    {
        key: "chemistry",
        q: "Какую химию используете для уборки?",
        a: "Используем сертифицированную профессиональную химию ведущих брендов. Все средства имеют сертификаты соответствия и санитарно-эпидемиологические заключения. Безопасны для людей, животных и поверхностей.",
    },
    {
        key: "warranty",
        q: "Что если меня не устроит результат уборки?",
        a: "По договору даём гарантию на выполненные работы. Если что-то не устроило — приедем и переделаем бесплатно. Достаточно сообщить в течение 24 часов после уборки.",
    },
];

type Props = {
    title?: string;
    subtitle?: string;
    items?: SanityFaqItem[];
};

export function FAQ({ title, subtitle, items }: Props) {
    const display: DisplayItem[] =
        items && items.length > 0
            ? items.map((it) => ({ key: it._id, q: it.question, a: it.answer }))
            : FALLBACK_ITEMS;

    return (
        <section id="faq" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Частые вопросы"}
                    // TODO: final copy from client
                    subtitle={
                        subtitle ?? "Ответы на вопросы которые задают чаще всего."
                    }
                />

                <div className="max-w-3xl mx-auto">
                    {display.map((item, i) => (
                        <details
                            key={item.key}
                            className={`group border-b border-ink/10 ${
                                i === display.length - 1 ? "border-b-0" : ""
                            }`}
                        >
                            <summary className="flex items-center justify-between gap-6 py-5 md:py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                <span className="text-base md:text-lg font-medium text-ink">
                                    {item.q}
                                </span>
                                <span
                                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan text-white transition-transform duration-200 group-open:rotate-45"
                                    aria-hidden="true"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="pb-5 md:pb-6 pr-12 text-ink/70 leading-relaxed whitespace-pre-line">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
