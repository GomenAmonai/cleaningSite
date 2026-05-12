import { z } from "zod";

/**
 * Accepts common Russian phone formats:
 *   +7 (999) 123-45-67   89991234567   7 999 123 45 67
 * Normalises to digits only and requires 11 digits starting with 7 (or 8 → 7).
 */
export function normalizePhone(raw: string): string | null {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
        return "7" + digits.slice(1);
    }
    if (digits.length === 10) {
        return "7" + digits;
    }
    return null;
}

export const inquirySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Минимум 2 символа")
        .max(100, "Максимум 100 символов"),
    phone: z
        .string()
        .trim()
        .min(1, "Укажите телефон")
        .refine((v) => normalizePhone(v) !== null, "Введите корректный номер"),
    email: z
        .string()
        .trim()
        .email("Некорректный email")
        .or(z.literal(""))
        .optional(),
    message: z
        .string()
        .trim()
        .max(1000, "Максимум 1000 символов")
        .optional()
        .or(z.literal("")),
    consent: z
        .boolean()
        .refine((v) => v === true, "Нужно согласие на обработку данных"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
