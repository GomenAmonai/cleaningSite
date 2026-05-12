import type { Service, SiteSettings } from "@/sanity/lib/types";

// TODO: final copy from client — used only when Sanity returns no services
const FALLBACK_SERVICE_TITLES = [
    "Уборка офисов",
    "Генеральная уборка",
    "Послестроительная уборка",
    "Мойка окон",
];

const NAV_ITEMS = [
    { label: "Главная", href: "#hero" },
    { label: "О нас", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Преимущества", href: "#why-us" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contact" },
];

const COMPANY_FALLBACK = "Название компании";

type Props = {
    settings?: SiteSettings;
    services?: Service[];
};

export function Footer({ settings, services }: Props) {
    const year = new Date().getFullYear();
    const company = settings?.companyName ?? COMPANY_FALLBACK;

    const contactItems = [
        settings?.phone ?? "+7 (XXX) XXX-XX-XX",
        settings?.email ?? "info@example.com",
        settings?.address ?? "г. Москва, ул. Примерная, д. 1",
        settings?.workingHours ?? "Пн–Вс: 9:00–21:00",
    ];

    const serviceTitles =
        services && services.length > 0
            ? services.slice(0, 6).map((s) => s.title)
            : FALLBACK_SERVICE_TITLES;

    return (
        <footer className="bg-ink text-white mt-auto">
            <div className="px-6 py-14 grid gap-10 md:grid-cols-3">
                <div>
                    <h3 className="text-base font-semibold mb-4">Контакты</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {contactItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-semibold mb-4">Услуги</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {serviceTitles.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-semibold mb-4">Навигация</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="px-6 py-6 border-t border-white/10 text-xs text-white/60">
                © {year} {company}. Все права защищены.
            </div>
        </footer>
    );
}
