import Link from "next/link";
import {
    Building2,
    Droplets,
    HardHat,
    HelpCircle,
    ShieldCheck,
    Snowflake,
    Sofa,
    Sparkles,
    Trash2,
    Wind,
    Wrench,
    type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service as SanityService } from "@/sanity/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
    Building2,
    Sparkles,
    HardHat,
    Wind,
    Sofa,
    Trash2,
    Snowflake,
    ShieldCheck,
    Droplets,
    Wrench,
};

type DisplayService = {
    key: string;
    icon: LucideIcon;
    title: string;
    description: string;
    slug?: string;
};

// TODO: final copy from client — used only when Sanity returns no services
const FALLBACK_SERVICES: DisplayService[] = [
    {
        key: "offices",
        icon: Building2,
        title: "Уборка офисов",
        description:
            "Ежедневная и поддерживающая уборка офисных помещений любой площади.",
    },
    {
        key: "general",
        icon: Sparkles,
        title: "Генеральная уборка",
        description:
            "Глубокая уборка с обработкой труднодоступных мест и сантехники.",
    },
    {
        key: "post-renovation",
        icon: HardHat,
        title: "Послестроительная уборка",
        description:
            "Удаление строительной пыли, грязи и следов ремонта после работ.",
    },
    {
        key: "windows",
        icon: Wind,
        title: "Мойка окон",
        description:
            "Мойка окон, фасадного остекления и витрин на высоте до 3 этажа.",
    },
    {
        key: "furniture",
        icon: Sofa,
        title: "Химчистка мебели",
        description:
            "Чистка диванов, кресел, ковров и текстиля профессиональной химией.",
    },
    {
        key: "garbage",
        icon: Trash2,
        title: "Вывоз мусора",
        description:
            "Вывоз строительного, бытового и крупногабаритного мусора.",
    },
    {
        key: "snow",
        icon: Snowflake,
        title: "Уборка снега",
        description:
            "Расчистка прилегающей территории, посыпка реагентами зимой.",
    },
    {
        key: "disinfection",
        icon: ShieldCheck,
        title: "Дезинфекция",
        description:
            "Обработка помещений дезинфицирующими средствами, сертифицированная химия.",
    },
];

type Props = {
    title?: string;
    subtitle?: string;
    services?: SanityService[];
};

export function Services({ title, subtitle, services }: Props) {
    const display: DisplayService[] =
        services && services.length > 0
            ? services.map((s) => ({
                  key: s._id,
                  icon: ICON_MAP[s.icon] ?? HelpCircle,
                  title: s.title,
                  description: s.description ?? "",
                  slug: s.slug,
              }))
            : FALLBACK_SERVICES;

    return (
        <section id="services" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Услуги"}
                    // TODO: final copy from client
                    subtitle={
                        subtitle ??
                        "Полный спектр клининговых услуг для бизнеса и помещений любого назначения."
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                    {display.map(({ key, icon: Icon, title, description, slug }) => {
                        const inner = (
                            <>
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
                            </>
                        );
                        const cardClass = "p-6 md:p-8 bg-white border border-ink/10 rounded-lg hover:border-cyan transition-colors block";
                        return slug ? (
                            <Link key={key} href={`/services/${slug}`} className={cardClass}>
                                {inner}
                            </Link>
                        ) : (
                            <article key={key} className={cardClass}>
                                {inner}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
