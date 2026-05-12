"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/app/actions/submit-inquiry";

type Props = {
    fallbackPhone?: string;
};

type Status =
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; message: string };

export function ContactForm({ fallbackPhone }: Props) {
    const [status, setStatus] = useState<Status>({ kind: "idle" });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InquiryInput>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        setStatus({ kind: "submitting" });
        try {
            const result = await submitInquiry(values);
            if (result.ok) {
                setStatus({ kind: "success" });
                reset();
            } else {
                setStatus({ kind: "error", message: result.error });
            }
        } catch (err) {
            console.error("[ContactForm] submit failed:", err);
            setStatus({
                kind: "error",
                message: fallbackPhone
                    ? `Не удалось отправить. Позвоните напрямую: ${fallbackPhone}`
                    : "Не удалось отправить. Попробуйте позже.",
            });
        }
    });

    const isSubmitting = status.kind === "submitting";

    const inputBase =
        "w-full bg-white border rounded-md px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-cyan transition-colors";

    const fieldBorder = (hasError: boolean) =>
        hasError ? "border-red-400 focus:border-red-500" : "border-ink/15 focus:border-cyan";

    if (status.kind === "success") {
        return (
            <div className="bg-white rounded-lg p-8 border border-ink/10 text-center">
                <h3 className="text-xl font-semibold text-ink">Заявка отправлена</h3>
                <p className="mt-3 text-ink/70">
                    Спасибо! Мы свяжемся с вами в течение часа.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus({ kind: "idle" })}
                    className="mt-6 inline-flex items-center justify-center text-cyan font-medium hover:underline"
                >
                    Отправить ещё одну
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="bg-white rounded-lg p-6 md:p-8 border border-ink/10 space-y-5"
        >
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink/70 mb-1">
                    Имя
                </label>
                <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${fieldBorder(!!errors.name)}`}
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink/70 mb-1">
                    Телефон
                </label>
                <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    aria-invalid={!!errors.phone}
                    className={`${inputBase} ${fieldBorder(!!errors.phone)}`}
                    {...register("phone")}
                />
                {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink/70 mb-1">
                    Email <span className="text-ink/40">(необязательно)</span>
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${fieldBorder(!!errors.email)}`}
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink/70 mb-1">
                    Сообщение <span className="text-ink/40">(необязательно)</span>
                </label>
                <textarea
                    id="message"
                    rows={4}
                    aria-invalid={!!errors.message}
                    className={`${inputBase} ${fieldBorder(!!errors.message)} resize-y`}
                    {...register("message")}
                />
                {errors.message && (
                    <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                )}
            </div>

            <div>
                <label className="flex items-start gap-3 text-sm text-ink/70 leading-relaxed">
                    <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-cyan"
                        {...register("consent")}
                    />
                    <span>
                        Согласен на{" "}
                        <a
                            href="/privacy"
                            className="text-cyan hover:underline"
                        >
                            обработку персональных данных
                        </a>
                    </span>
                </label>
                {errors.consent && (
                    <p className="text-sm text-red-600 mt-1">{errors.consent.message}</p>
                )}
            </div>

            {status.kind === "error" && (
                <p className="text-sm text-red-600">{status.message}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-cyan hover:bg-cyan/85 text-white font-semibold px-8 py-4 rounded-md transition-colors w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            </button>
        </form>
    );
}
