"use client";

import { useState } from "react";
import { useContactModal } from "@/components/providers/ModalProvider";

type NavItem =
    | { label: string; href: string; modal?: false }
    | { label: string; href?: never; modal: true };

const NAV_ITEMS: NavItem[] = [
    { label: "Главная", href: "#hero" },
    { label: "О нас", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Преимущества", href: "#why-us" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", modal: true },
];

const COMPANY_FALLBACK = "Название компании";
const PHONE_FALLBACK = "+7 (XXX) XXX-XX-XX";

type Props = {
    companyName?: string;
    phone?: string;
};

export function Header({ companyName, phone }: Props) {
    const [open, setOpen] = useState(false);
    const { openContactModal } = useContactModal();

    const displayCompany = companyName ?? COMPANY_FALLBACK;
    const displayPhone = phone ?? PHONE_FALLBACK;
    const telHref = `tel:${displayPhone.replace(/[^+\d]/g, "")}`;

    const navLinkClass = "text-ink/80 hover:text-cyan transition-colors";

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-black/5">
            <div className="flex items-center justify-between gap-6 px-6 h-16 md:h-20">
                <a
                    href="#hero"
                    className="font-semibold text-lg text-ink shrink-0"
                >
                    {displayCompany}
                </a>

                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                    {NAV_ITEMS.map((item) =>
                        item.modal ? (
                            <button
                                key="contacts"
                                type="button"
                                onClick={openContactModal}
                                className={navLinkClass}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <a
                                key={item.href}
                                href={item.href}
                                className={navLinkClass}
                            >
                                {item.label}
                            </a>
                        )
                    )}
                </nav>

                <a
                    href={telHref}
                    className="hidden md:inline-flex font-semibold text-ink hover:text-cyan transition-colors"
                >
                    {displayPhone}
                </a>

                <button
                    type="button"
                    aria-label={open ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={open}
                    className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="sr-only">Меню</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        {open ? (
                            <>
                                <line x1="6" y1="6" x2="18" y2="18" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {open && (
                <div className="lg:hidden border-t border-black/5 bg-white">
                    <nav className="flex flex-col px-6 py-4 gap-3 text-sm font-medium">
                        {NAV_ITEMS.map((item) =>
                            item.modal ? (
                                <button
                                    key="contacts"
                                    type="button"
                                    onClick={() => { setOpen(false); openContactModal(); }}
                                    className="text-ink/80 hover:text-cyan transition-colors py-1 text-left"
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="text-ink/80 hover:text-cyan transition-colors py-1"
                                >
                                    {item.label}
                                </a>
                            )
                        )}
                        <a
                            href={telHref}
                            className="md:hidden font-semibold text-ink mt-2"
                        >
                            {displayPhone}
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
