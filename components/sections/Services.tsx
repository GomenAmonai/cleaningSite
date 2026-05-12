import {
    Building2,
    HardHat,
    ShieldCheck,
    Snowflake,
    Sofa,
    Sparkles,
    Trash2,
    Wind,
    type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Service = {
    icon: LucideIcon;
    title: string;
    description: string;
};

// TODO: final copy from client
const SERVICES: Service[] = [
    {
        icon: Building2,
        title: "Уборка офисов",
        description:
            "Ежедневная и поддерживающая уборка офисных помещений любой площади.",
    },
    {
        icon: Sparkles,
        title: "Генеральная уборка",
        description:
            "Глубокая уборка с обработкой труднодоступных мест и сантехники.",
    },
    {
        icon: HardHat,
        title: "Послестроительная уборка",
        description:
            "Удаление строительной пыли, грязи и следов ремонта после работ.",
    },
    {
        icon: Wind,
        title: "Мойка окон",
        description:
            "Мойка окон, фасадного остекления и витрин на высоте до 3 этажа.",
    },
    {
        icon: Sofa,
        title: "Химчистка мебели",
        description:
            "Чистка диванов, кресел, ковров и текстиля профессиональной химией.",
    },
    {
        icon: Trash2,
        title: "Вывоз мусора",
        description:
            "Вывоз строительного, бытового и крупногабаритного мусора.",
    },
    {
        icon: Snowflake,
        title: "Уборка снега",
        description:
            "Расчистка прилегающей территории, посыпка реагентами зимой.",
    },
    {
        icon: ShieldCheck,
        title: "Дезинфекция",
        description:
            "Обработка помещений дезинфицирующими средствами, сертифицированная химия.",
    },
];

export function Services() {
    return (
        <section id="services" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client
                    title="Услуги"
                    // TODO: final copy from client
                    subtitle="Полный спектр клининговых услуг для бизнеса и помещений любого назначения."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                    {SERVICES.map(({ icon: Icon, title, description }) => (
                        <article
                            key={title}
                            className="p-6 md:p-8 bg-white border border-ink/10 rounded-lg hover:border-cyan transition-colors"
                        >
                            <Icon
                                className="text-cyan"
                                size={44}
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                            <h3 className="mt-5 text-lg font-semibold text-ink">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
