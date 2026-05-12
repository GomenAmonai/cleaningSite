"use client";

import { type RefObject, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

type Props = {
    dialogRef: RefObject<HTMLDialogElement | null>;
};

export function ContactModal({ dialogRef }: Props) {
    const close = useCallback(() => {
        dialogRef.current?.close();
    }, [dialogRef]);

    // Close on backdrop click
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDialogElement>) => {
            const rect = dialogRef.current?.getBoundingClientRect();
            if (!rect) return;
            const outside =
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom;
            if (outside) close();
        },
        [close, dialogRef]
    );

    // Close on Escape (native dialog handles this, but we reset body scroll)
    useEffect(() => {
        const el = dialogRef.current;
        if (!el) return;
        const handleClose = () => {
            document.body.style.overflow = "";
        };
        const handleOpen = () => {
            document.body.style.overflow = "hidden";
        };
        el.addEventListener("close", handleClose);
        // MutationObserver to detect open attribute
        const observer = new MutationObserver(() => {
            if (el.open) handleOpen();
            else handleClose();
        });
        observer.observe(el, { attributes: true, attributeFilter: ["open"] });
        return () => {
            el.removeEventListener("close", handleClose);
            observer.disconnect();
        };
    }, [dialogRef]);

    return (
        <dialog
            ref={dialogRef}
            onClick={handleClick}
            className="m-auto w-full max-w-lg rounded-xl p-0 bg-transparent backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:animate-none"
        >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
                    <h2 className="text-lg font-semibold text-ink">Оставить заявку</h2>
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Закрыть"
                        className="text-ink/40 hover:text-ink transition-colors p-1 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* Body */}
                <div className="p-6">
                    <ContactForm />
                </div>
            </div>
        </dialog>
    );
}
