import Link from "next/link";

type HeaderProps = {
    companyName?: string;
    phone?: string;
};

export function Header({ companyName, phone }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-surface border-b border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                <Link href="/" className="font-serif text-xl font-medium text-foreground tracking-tight">
                    {companyName || "Клининг"}
                </Link>

                <div className="flex items-center gap-6">
                    {phone && (
                        <a
                        href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                        className="hidden sm:block text-sm font-medium text-foreground hover:text-accent transition-colors"
                        >
                    {phone}
                        </a>
                        )}
                    <Link
                        href="#contact"
                        className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
                    >
                        Связаться
                    </Link>
                </div>
            </div>
        </header>
    );
}