import type { Image as SanityImage } from "sanity";

export type SiteSettings = {
    companyName?: string;
    phone?: string;
    email?: string;
    address?: string;
    workingHours?: string;
    telegram?: string;
    whatsapp?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroImage?: SanityImage;
    aboutTitle?: string;
    whyUsTitle?: string;
    servicesTitle?: string;
    faqTitle?: string;
    clientsTitle?: string;
    reviewsTitle?: string;
    contactTitle?: string;
};

export type PortableTextBlock = {
    _type: "block";
    _key: string;
    style?: string;
    children: Array<{ _type: "span"; _key: string; text: string; marks?: string[] }>;
    markDefs?: unknown[];
};

export type Service = {
    _id: string;
    title: string;
    description?: string;
    icon: string;
    order?: number;
    image?: SanityImage;
    slug?: string;
    heroImage?: SanityImage;
    longDescription?: PortableTextBlock[];
    features?: string[];
    pricing?: string;
    metaTitle?: string;
    metaDescription?: string;
};

export type AboutSlide = {
    _id: string;
    title: string;
    body: string;
    image?: SanityImage;
    order?: number;
};

export type WhyUsCard = {
    _id: string;
    number: string;
    title: string;
    description?: string;
    order?: number;
};

export type FaqItem = {
    _id: string;
    question: string;
    answer: string;
    order?: number;
};

export type Review = {
    _id: string;
    authorName: string;
    authorCompany?: string;
    text: string;
    rating?: number;
    order?: number;
};

export type Client = {
    _id: string;
    name: string;
    logo: SanityImage;
    url?: string;
    order?: number;
};
