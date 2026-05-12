import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@/sanity/lib/types";

const components = {
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="mb-4 last:mb-0 text-ink/80 leading-relaxed">{children}</p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-xl font-semibold text-ink mb-3 mt-6">{children}</h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-lg font-semibold text-ink mb-2 mt-4">{children}</h3>
        ),
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-ink/80">{children}</ul>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-ink/80">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
        number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="font-semibold text-ink">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
    return <PortableText value={value} components={components as Parameters<typeof PortableText>[0]["components"]} />;
}
