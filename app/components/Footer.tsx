type FooterProps = {
    companyName?: string;
    phone?: string;
};

export function Footer({ companyName, phone }: FooterProps) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="font-serif text-lg text-foreground tracking-tight">
                        {companyName || "Клининг"}
                    </p>

                    {phone && (
                        <a
                        href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                        className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                    {phone}
                        </a>
                        )}

                    <p className="text-sm text-muted">
                        © {year} Все права защищены
                    </p>
                </div>
            </div>
        </footer>
    );
}