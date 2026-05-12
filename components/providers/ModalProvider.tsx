"use client";

import {
    createContext,
    useCallback,
    useContext,
    useRef,
    type ReactNode,
} from "react";
import { ContactModal } from "@/components/ui/ContactModal";

type ModalContextValue = {
    openContactModal: () => void;
};

const ModalContext = createContext<ModalContextValue>({
    openContactModal: () => {},
});

export function useContactModal() {
    return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openContactModal = useCallback(() => {
        dialogRef.current?.showModal();
    }, []);

    return (
        <ModalContext.Provider value={{ openContactModal }}>
            {children}
            <ContactModal dialogRef={dialogRef} />
        </ModalContext.Provider>
    );
}
