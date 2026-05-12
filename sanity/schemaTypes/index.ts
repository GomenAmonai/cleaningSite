import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { aboutSlide } from "./aboutSlide";
import { whyUsCard } from "./whyUsCard";
import { faqItem } from "./faqItem";
import { review } from "./review";
import { client } from "./client";
import { inquiry } from "./inquiry";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        siteSettings,
        service,
        aboutSlide,
        whyUsCard,
        faqItem,
        review,
        client,
        inquiry,
    ],
};
