#!/usr/bin/env node
/**
 * Seed Sanity with placeholder content + uploads service images from
 * public/services/*.png and references them in each service document.
 *
 * Idempotent: uses fixed _ids so re-runs overwrite.
 *
 * Run:
 *   npm run seed
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 *
 * NOTE: All copy is placeholder pending real client data —
 * fields needing validation are marked with [TODO: ...] in comments.
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-09";

if (!projectId || !dataset) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in env.");
    process.exit(1);
}
if (!token) {
    console.error("Missing SANITY_API_WRITE_TOKEN in env (needs write permissions).");
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
});

// -----------------------------------------------------------------------------
// Image upload helper
// -----------------------------------------------------------------------------

async function uploadServiceImage(slug) {
    const path = resolve(projectRoot, "public/services", `${slug}.png`);
    try {
        const buffer = await readFile(path);
        const asset = await client.assets.upload("image", buffer, {
            filename: `${slug}.png`,
        });
        console.log(`  ↑ uploaded ${slug}.png → ${asset._id}`);
        return {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
        };
    } catch (err) {
        console.warn(`  ⚠ skip image for ${slug}: ${err.message}`);
        return undefined;
    }
}

// Helper for portable text blocks
const block = (text, key) => ({
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Purum.space",
    phone: "+7 (991) 684 22-57",
    email: "purumspace@gmail.com",
    address: "Москва, выезжаем на объект", // [TODO: реальный адрес если есть]
    workingHours: "Пн–Пт: 9:00–20:00, Сб: 10:00–18:00", // [TODO: реальные часы]
    heroTitle: "Профессиональная уборка для бизнеса в Москве",
    heroSubtitle:
        "Офисы, помещения, послестроительная уборка. Работаем по договору, оплата по факту.",
    heroCtaLabel: "Оставить заявку",
    aboutTitle: "О компании",
    whyUsTitle: "Почему нас выбирают",
    servicesTitle: "Услуги",
    faqTitle: "Частые вопросы",
    clientsTitle: "Наши клиенты",
    reviewsTitle: "Отзывы",
    contactTitle: "Свяжитесь с нами",
};

const servicesData = [
    {
        slug: "offices",
        icon: "Building2",
        title: "Уборка офисов",
        description:
            "Ежедневная и поддерживающая уборка офисных помещений. График под ваш режим работы.",
        pricing: "от 80 ₽/м²", // [TODO: валидировать]
        features: [
            "Влажная уборка полов, обработка плинтусов",
            "Протирка рабочих столов, мебели, оргтехники",
            "Сбор и вынос мусора, замена пакетов",
            "Уборка санузлов с дезинфекцией",
            "Уборка кухни и зон отдыха, мытьё посуды",
            "Восполнение расходников (по договорённости)",
        ],
        longDescription: [
            block(
                "Регулярная уборка офиса — это не только чистота, но и предсказуемость. Мы согласовываем чек-лист работ и график на старте, фиксируем в договоре, и каждый раз выполняем тот же объём в то же время. Менеджер контролирует объект — вам не нужно объяснять одно и то же новому клинеру.",
                "b1"
            ),
            block(
                "Работаем в любое время: до начала рабочего дня, после, ночью или в обед. Подбираем график так, чтобы наша работа была незаметна для ваших сотрудников и клиентов.",
                "b2"
            ),
        ],
    },
    {
        slug: "general",
        icon: "Sparkles",
        title: "Генеральная уборка",
        description:
            "Глубокая уборка с обработкой труднодоступных мест, сантехники, мебели и техники.",
        pricing: "от 120 ₽/м²", // [TODO: валидировать]
        features: [
            "Мойка окон изнутри и снаружи (до 3 этажа)",
            "Удаление налёта в санузлах, чистка сантехники",
            "Влажная уборка под мебелью, за оргтехникой",
            "Протирка стен, дверей, плинтусов, выключателей",
            "Чистка вентиляционных решёток и кондиционеров (внешняя)",
            "Полировка стеклянных и зеркальных поверхностей",
        ],
        longDescription: [
            block(
                "Генеральную уборку заказывают раз в 3–6 месяцев — она доводит помещение до состояния, в котором его сложно поддерживать ежедневно. Делаем то, до чего не доходят руки во время регулярного клининга: моем окна, обрабатываем налёт, выгребаем пыль из труднодоступных мест.",
                "b1"
            ),
            block(
                "Подходит перед важными событиями (приезд комиссии, аудит, фотосессия офиса), после длинных праздников или просто раз в квартал для поддержания стандарта.",
                "b2"
            ),
        ],
    },
    {
        slug: "post-renovation",
        icon: "HardHat",
        title: "Уборка после ремонта",
        description:
            "Удаление строительной пыли, наклеек, следов краски и клея. Помещение готово к заезду.",
        pricing: "от 150 ₽/м²", // [TODO: валидировать]
        features: [
            "Удаление строительной пыли со всех поверхностей (в несколько проходов)",
            "Снятие плёнки, стикеров, клея с окон и техники",
            "Удаление следов краски, шпаклёвки, цемента",
            "Мойка окон, рам, подоконников",
            "Чистка сантехники и фурнитуры",
            "Финальная уборка с дезинфекцией",
        ],
        longDescription: [
            block(
                "После ремонта пыль оседает в местах, о которых обычно не думают: вентиляция, розетки, пространство за батареями, верх дверных проёмов. Если её не убрать, она будет подниматься в воздух ещё месяцами и оседать обратно.",
                "b1"
            ),
            block(
                "Делаем уборку в 2–3 прохода: сначала сухая уборка крупного мусора, потом первичная влажная уборка пыли, потом финальная с дезинфекцией. Помещение готово к заезду сотрудников.",
                "b2"
            ),
        ],
    },
    {
        slug: "windows",
        icon: "Wind",
        title: "Мойка окон",
        // [TODO: уточнить до какого этажа работают и есть ли промальп]
        description:
            "Окна, витрины, фасадное остекление. До 3 этажа без специального оборудования.",
        pricing: "от 200 ₽/окно", // [TODO: валидировать]
        features: [
            "Мойка стекла с двух сторон",
            "Очистка рам и подоконников",
            "Мойка витрин и стеклянных перегородок",
            "Фасадное остекление до 3 этажа",
            "Удаление известкового налёта",
            "Без разводов и полос",
        ],
        longDescription: [
            block(
                "Моем окна, витрины и стеклянные перегородки в офисах, магазинах и заведениях общепита. До 3 этажа работаем с земли с телескопическими швабрами — без подъёмников и страховки.",
                "b1"
            ),
            block(
                "Используем профессиональную химию и резиновые сгоны, которые не оставляют разводов. Если на стекле известковый налёт от дождя — обрабатываем кислотными составами без повреждения рам.",
                "b2"
            ),
        ],
    },
    // ────────────────────────────────────────────────────────────────────
    // [TODO: подтвердить с владельцем что услуги ниже реально оказываются.
    // Если нет — удалить. Сейчас тексты — placeholder.]
    // ────────────────────────────────────────────────────────────────────
    {
        slug: "furniture",
        icon: "Sofa",
        title: "Химчистка мебели",
        description:
            "Чистка диванов, кресел, ковров и текстиля профессиональной химией.",
        pricing: "от 800 ₽/посадочное место", // [TODO]
        features: [
            "Чистка диванов, кресел, пуфов",
            "Чистка ковров и ковровых покрытий",
            "Удаление пятен и запахов",
            "Безопасная химия, гипоаллергенные составы",
            "Быстрое высыхание — 2–4 часа",
            "Дезинфекция и антибактериальная обработка",
        ],
        longDescription: [
            block(
                "Химчистка мягкой мебели на дому или в офисе — без перевозки. Профессиональное оборудование извлекает загрязнения из глубины ткани, куда не достаёт обычный пылесос.",
                "b1"
            ),
            block(
                "Сертифицированная химия безопасна для детей, аллергиков и домашних животных. Мебель готова к использованию через несколько часов после обработки.",
                "b2"
            ),
        ],
    },
    {
        slug: "garbage",
        icon: "Trash2",
        title: "Вывоз мусора",
        description:
            "Вывоз строительного, бытового и крупногабаритного мусора.",
        pricing: "от 3 500 ₽/машина", // [TODO]
        features: [
            "Строительный мусор после ремонта",
            "Крупногабаритная мебель и техника",
            "Бытовые отходы",
            "Грузчики в бригаде",
            "Газель и грузовые автомобили",
            "Утилизация по экологическим нормам",
        ],
        longDescription: [
            block(
                "Оперативный вывоз мусора любого объёма: от пары мешков до нескольких машин строительных отходов. В бригаде — грузчики, всё сделаем сами.",
                "b1"
            ),
            block(
                "Работаем по договору, предоставляем документы для юридических лиц. Вывоз в лицензированные пункты утилизации.",
                "b2"
            ),
        ],
    },
    {
        slug: "snow",
        icon: "Snowflake",
        title: "Уборка снега",
        description:
            "Расчистка прилегающей территории, посыпка реагентами зимой.",
        pricing: "от 5 000 ₽/выезд", // [TODO]
        features: [
            "Ручная и механическая уборка снега",
            "Расчистка парковок и подъездных путей",
            "Посыпка реагентами и песком",
            "Сколка льда",
            "Абонементное обслуживание на сезон",
            "Выезд в течение 2 часов после снегопада",
        ],
        longDescription: [
            block(
                "Своевременная уборка снега и наледи — это безопасность сотрудников и клиентов. Мы оперативно выезжаем после снегопадов и обеспечиваем чистоту территории круглую зиму.",
                "b1"
            ),
            block(
                "Предлагаем абонементное обслуживание на весь зимний сезон с фиксированной ценой — без переплат в дни сильных снегопадов.",
                "b2"
            ),
        ],
    },
    {
        slug: "disinfection",
        icon: "ShieldCheck",
        title: "Дезинфекция",
        // [TODO: уточнить лицензию Роспотребнадзора]
        description:
            "Обработка помещений дезинфицирующими средствами, сертифицированная химия.",
        pricing: "от 30 ₽/м²", // [TODO]
        features: [
            "Обработка всех поверхностей",
            "Дезинфекция воздуха (распыление)",
            "Уничтожение бактерий и вирусов",
            "Сертифицированные препараты",
            "Протокол и документы для СЭС",
            "Помещение готово через 2 часа",
        ],
        longDescription: [
            block(
                "Профессиональная дезинфекция показана после болезни, при смене арендатора, а также как плановая мера для медицинских учреждений, пищевых производств и офисов.",
                "b1"
            ),
            block(
                "Применяем препараты 3–4 классов опасности, безопасные для людей и животных после проветривания. Выдаём акт о проведённой дезинфекции.",
                "b2"
            ),
        ],
    },
];

// About slides — [TODO: валидировать с владельцем]
const aboutSlides = [
    {
        slug: "experience",
        title: "Опыт работы",
        // [TODO: реальные годы. Не писать "более 5 лет" если меньше]
        body: "Работаем в Москве, специализируемся на коммерческих помещениях. Регулярно обслуживаем офисы и помещения от 50 до 2000 м².",
    },
    {
        slug: "staff",
        title: "Своя команда",
        // [TODO: если правда — оставить. Если субподряд — переписать]
        body: "Клинеры в штате, не передаём заказы на сторону. На вашем объекте — одни и те же люди, знают помещение и стандарты.",
    },
    {
        slug: "schedule",
        title: "Гибкий график",
        body: "Убираем в нерабочие часы — рано утром, вечером, ночью или в выходные. Не мешаем сотрудникам и клиентам.",
    },
    {
        slug: "contract",
        title: "Договор и документы",
        // [TODO: уточнить — ИП или ООО, с НДС или без]
        body: "Работаем по договору с первого выезда. Акт выполненных работ и счёт — после каждой уборки. Полный пакет закрывающих для бухгалтерии.",
    },
];

// WhyUs — переписанные с большей конкретикой (из CONTENT_PROMPT.md)
const whyUsCards = [
    {
        slug: "contract",
        number: "01",
        title: "Договор и закрывающие",
        description:
            "Работаем по договору с первого выезда. Акт выполненных работ и счёт — после каждой уборки.",
    },
    {
        slug: "price",
        number: "02",
        title: "Прозрачная цена",
        description:
            "Цена фиксируется в договоре после замера объекта. Не растёт, если в процессе обнаружили «дополнительные» работы.",
    },
    {
        slug: "staff",
        number: "03",
        title: "Своя команда",
        // [TODO: валидировать что штат, не субподряд]
        description:
            "Клинеры в штате, не привлекаем сторонних. На вашем объекте — одни и те же люди, знают помещение и стандарты.",
    },
    {
        slug: "schedule",
        number: "04",
        title: "Удобный для вас график",
        description:
            "Работаем в любое время: рано утром, вечером, ночью, в выходные. Не мешаем сотрудникам и клиентам.",
    },
    {
        slug: "chemistry",
        number: "05",
        title: "Сертифицированная химия",
        // [TODO: указать конкретные бренды]
        description:
            "Используем сертифицированные профессиональные составы. Безопасно для людей, техники и поверхностей — есть документы.",
    },
    {
        slug: "warranty",
        number: "06",
        title: "Гарантия 24 часа",
        // [TODO: уточнить срок претензии]
        description:
            "Если на следующий день что-то не так — приедем и переделаем за наш счёт. По договору, без споров.",
    },
];

// FAQ — переписанные из CONTENT_PROMPT.md
const faqItems = [
    {
        slug: "price",
        question: "Сколько стоит уборка офиса?",
        // [TODO: цены]
        answer:
            "Базовая ставка поддерживающей уборки — от 80 ₽/м². Генеральная — от 120 ₽/м². Финальная цена зависит от площади, периодичности и состава работ — рассчитываем после бесплатного выезда замерщика.",
    },
    {
        slug: "minimum",
        question: "Какой минимальный объём заказа?",
        // [TODO: минимальная сумма или площадь]
        answer:
            "Считаем по площади, без жёсткого минимума. Для разовых уборок небольших помещений может действовать минимальная стоимость выезда — уточните при расчёте.",
    },
    {
        slug: "contract",
        question: "Заключаете ли договор? Какие закрывающие документы?",
        // [TODO: с НДС или без? ИП или ООО?]
        answer:
            "Да, договор обязателен с первого выезда. После каждой уборки выдаём акт выполненных работ и счёт. Все документы оформляем для бухгалтерии вашей компании.",
    },
    {
        slug: "schedule",
        question: "Работаете ли по выходным и ночью?",
        // [TODO: с надбавкой или без?]
        answer:
            "Да. График согласовываем на этапе договора и фиксируем. Ночные и выходные смены входят в стоимость без надбавок при регулярном обслуживании.",
    },
    {
        slug: "warranty",
        question: "Какие гарантии?",
        // [TODO: срок претензии]
        answer:
            "Если в течение 24 часов после уборки заметили недочёты — звоните, приедем и переделаем без доплаты. Это прописано в договоре.",
    },
    {
        slug: "scope",
        question: "С какими помещениями работаете?",
        // [TODO: уточнить географию и типы]
        answer:
            "Офисы, бизнес-центры, коворкинги, шоурумы, магазины. Площадь от 50 до 2000 м². Работаем в Москве в пределах МКАД, ближнее Подмосковье — по договорённости.",
    },
];

// -----------------------------------------------------------------------------
// Execute
// -----------------------------------------------------------------------------

console.log(`Seeding to ${projectId}/${dataset}…\n`);

// 1. Cleanup duplicate siteSettings
console.log("→ Cleanup duplicate siteSettings…");
try {
    const dupes = await client.fetch(
        `*[_type == "siteSettings" && _id != "siteSettings"]._id`
    );
    if (dupes.length > 0) {
        console.log(`  Found ${dupes.length} duplicate(s): ${dupes.join(", ")}`);
        for (const id of dupes) {
            await client.delete(id);
            console.log(`  ✓ deleted ${id}`);
        }
    } else {
        console.log("  No duplicates found.");
    }
} catch (err) {
    console.warn(`  ⚠ cleanup skipped: ${err.message}`);
}

// 2. Upload service images
console.log("\n→ Uploading service images from public/services/…");
const serviceImages = {};
for (const s of servicesData) {
    serviceImages[s.slug] = await uploadServiceImage(s.slug);
}

// 3. Build all documents
const services = servicesData.map((s, i) => ({
    _id: `seed.service.${s.slug}`,
    _type: "service",
    title: s.title,
    description: s.description,
    icon: s.icon,
    slug: { _type: "slug", current: s.slug },
    pricing: s.pricing,
    features: s.features,
    longDescription: s.longDescription,
    order: i,
    ...(serviceImages[s.slug]
        ? { image: serviceImages[s.slug], heroImage: serviceImages[s.slug] }
        : {}),
}));

const aboutSlideDocs = aboutSlides.map((s, i) => ({
    _id: `seed.aboutSlide.${s.slug}`,
    _type: "aboutSlide",
    title: s.title,
    body: s.body,
    order: i,
}));

const whyUsDocs = whyUsCards.map((c, i) => ({
    _id: `seed.whyUsCard.${c.slug}`,
    _type: "whyUsCard",
    number: c.number,
    title: c.title,
    description: c.description,
    order: i,
}));

const faqDocs = faqItems.map((f, i) => ({
    _id: `seed.faqItem.${f.slug}`,
    _type: "faqItem",
    question: f.question,
    answer: f.answer,
    order: i,
}));

const docs = [siteSettings, ...services, ...aboutSlideDocs, ...whyUsDocs, ...faqDocs];

console.log(`\n→ Committing ${docs.length} documents…`);

// For siteSettings: patch (preserve heroImage and other Studio-managed fields)
// For everything else: createOrReplace
const existingSettings = await client.fetch(`*[_id == "siteSettings"][0]`);
const tx = client.transaction();

for (const doc of docs) {
    if (doc._id === "siteSettings" && existingSettings) {
        // Merge: only overwrite fields we define in seed, preserve heroImage etc.
        const merged = { ...existingSettings, ...doc };
        tx.createOrReplace(merged);
    } else {
        tx.createOrReplace(doc);
    }
}

try {
    const result = await tx.commit();
    console.log(`✓ Committed transaction (${result.results?.length ?? docs.length} ops).`);
    console.log(`\nDone. Site should reflect changes in ~60s (ISR revalidation).`);
} catch (err) {
    console.error("✗ Seed failed:", err.message || err);
    process.exit(1);
}
