"use client";

import { useContactModal } from "@/components/providers/ModalProvider";

export function ContactButton({ className }: { className?: string }) {
    const { openContactModal } = useContactModal();
    return (
        <button
            type="button"
            onClick={openContactModal}
            className={className ?? "w-full bg-cyan text-white font-medium py-3 px-6 rounded-lg hover:bg-cyan/85 transition-colors text-sm"}
        >
            Оставить заявку
        </button>
    );
}
