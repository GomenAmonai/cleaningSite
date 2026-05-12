import type { StructureResolver } from "sanity/structure";
import {
    CogIcon,
    SparklesIcon,
    ImagesIcon,
    CheckmarkCircleIcon,
    HelpCircleIcon,
    CommentIcon,
    UsersIcon,
    EnvelopeIcon,
} from "@sanity/icons";

export const SINGLETON_TYPES = new Set(["siteSettings"]);
export const SINGLETON_IDS = new Set(["siteSettings"]);

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Контент")
        .items([
            S.listItem()
                .title("Настройки сайта")
                .icon(CogIcon)
                .child(
                    S.document()
                        .schemaType("siteSettings")
                        .documentId("siteSettings")
                ),
            S.divider(),
            S.documentTypeListItem("service").title("Услуги").icon(SparklesIcon),
            S.documentTypeListItem("aboutSlide")
                .title("Слайды «О компании»")
                .icon(ImagesIcon),
            S.documentTypeListItem("whyUsCard")
                .title("Карточки «Почему мы»")
                .icon(CheckmarkCircleIcon),
            S.documentTypeListItem("faqItem").title("FAQ").icon(HelpCircleIcon),
            S.documentTypeListItem("review").title("Отзывы").icon(CommentIcon),
            S.documentTypeListItem("client").title("Клиенты").icon(UsersIcon),
            S.divider(),
            S.listItem()
                .title("Заявки")
                .icon(EnvelopeIcon)
                .child(
                    S.list()
                        .title("Заявки")
                        .items([
                            S.listItem()
                                .title("Все")
                                .child(
                                    S.documentTypeList("inquiry")
                                        .title("Все заявки")
                                        .defaultOrdering([
                                            { field: "createdAt", direction: "desc" },
                                        ])
                                ),
                            S.listItem()
                                .title("Новые")
                                .child(
                                    S.documentList()
                                        .title("Новые заявки")
                                        .schemaType("inquiry")
                                        .filter('_type == "inquiry" && status == "new"')
                                        .defaultOrdering([
                                            { field: "createdAt", direction: "desc" },
                                        ])
                                ),
                            S.listItem()
                                .title("В работе")
                                .child(
                                    S.documentList()
                                        .title("В работе")
                                        .schemaType("inquiry")
                                        .filter('_type == "inquiry" && status == "contacted"')
                                        .defaultOrdering([
                                            { field: "createdAt", direction: "desc" },
                                        ])
                                ),
                            S.listItem()
                                .title("Закрытые")
                                .child(
                                    S.documentList()
                                        .title("Закрытые заявки")
                                        .schemaType("inquiry")
                                        .filter('_type == "inquiry" && status in ["converted", "archived"]')
                                        .defaultOrdering([
                                            { field: "createdAt", direction: "desc" },
                                        ])
                                ),
                        ])
                ),
        ]);
