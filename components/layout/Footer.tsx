const CONTACT_ITEMS = [
    "+7 (XXX) XXX-XX-XX",
    "info@example.com",
    "г. Москва, ул. Примерная, д. 1",
    "Пн–Вс: 9:00–21:00",
];

const SERVICE_ITEMS = [
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
    { label: "Контакты", href: "#contacts" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white mt-auto">
            <div className="px-6 py-14 grid gap-10 md:grid-cols-3">
                <div>
                    <h3 className="text-base font-semibold mb-4">Контакты</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {CONTACT_ITEMS.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-semibold mb-4">Услуги</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {SERVICE_ITEMS.map((item) => (
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
                © {year} Название компании. Все права защищены.
            </div>
        </footer>
    );
}
