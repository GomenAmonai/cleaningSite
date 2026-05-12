"use server";

import { inquirySchema, normalizePhone, type InquiryInput } from "@/lib/inquiry-schema";
import { getWriteClient } from "@/sanity/lib/writeClient";

export type SubmitResult =
    | { ok: true }
    | { ok: false; error: string; fieldErrors?: Partial<Record<keyof InquiryInput, string>> };

function formatTime(date: Date): string {
    // Format as "dd.mm.yyyy HH:mm МСК" in Europe/Moscow
    const moscow = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(date);
    const get = (t: string) => moscow.find((p) => p.type === t)?.value ?? "";
    return `${get("day")}.${get("month")}.${get("year")} ${get("hour")}:${get("minute")} МСК`;
}

function escapeHtml(s: string): string {
    return s.replace(/[&<>]/g, (c) =>
        c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"
    );
}

async function sendTelegram(text: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        console.warn("[submit-inquiry] TELEGRAM_BOT_TOKEN/CHAT_ID not set, skipping Telegram delivery");
        return;
    }
    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "HTML",
            }),
            cache: "no-store",
        });
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            console.error("[submit-inquiry] Telegram non-OK response:", res.status, body);
        }
    } catch (err) {
        console.error("[submit-inquiry] Telegram delivery failed:", err);
    }
}

async function saveInquiryToSanity(input: InquiryInput, createdAt: string): Promise<void> {
    const client = getWriteClient();
    if (!client) {
        console.warn("[submit-inquiry] SANITY_API_WRITE_TOKEN not set, skipping Sanity write");
        return;
    }
    try {
        await client.create({
            _type: "inquiry",
            name: input.name,
            phone: input.phone,
            email: input.email || undefined,
            message: input.message || undefined,
            createdAt,
            status: "new",
        });
    } catch (err) {
        console.error("[submit-inquiry] Sanity write failed:", err);
    }
}

export async function submitInquiry(rawInput: unknown): Promise<SubmitResult> {
    const parsed = inquirySchema.safeParse(rawInput);
    if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof InquiryInput, string>> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0] as keyof InquiryInput | undefined;
            if (key && !fieldErrors[key]) {
                fieldErrors[key] = issue.message;
            }
        }
        return { ok: false, error: "Проверьте поля формы.", fieldErrors };
    }

    const data = parsed.data;
    const normalizedPhone = normalizePhone(data.phone) ?? data.phone;
    const createdAt = new Date().toISOString();

    const lines = [
        "🧹 <b>Новая заявка</b>",
        `<b>Имя:</b> ${escapeHtml(data.name)}`,
        `<b>Телефон:</b> +${escapeHtml(normalizedPhone)}`,
        `<b>Email:</b> ${data.email ? escapeHtml(data.email) : "—"}`,
        `<b>Сообщение:</b> ${data.message ? escapeHtml(data.message) : "—"}`,
        `<b>Время:</b> ${formatTime(new Date(createdAt))}`,
    ];

    // Both writes run; both are non-fatal — we still return ok:true so the
    // user sees confirmation. Real failures are surfaced in server logs.
    await Promise.allSettled([
        sendTelegram(lines.join("\n")),
        saveInquiryToSanity({ ...data, phone: `+${normalizedPhone}` }, createdAt),
    ]);

    return { ok: true };
}
