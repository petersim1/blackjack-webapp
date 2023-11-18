"use client";

import { FC, ReactNode, createContext, useContext, useState, useEffect } from "react";

import { ModalContextI } from "@/_lib/types";
import { INITIAL_MODAL_CONTEXT } from "./initialValues";
import Modal from "@/_components/Elements/Modal";

export const ModalContext = createContext<ModalContextI>(INITIAL_MODAL_CONTEXT);

export const ModalProvider: FC<{ children: ReactNode; closeButton: boolean }> = ({
  children,
  closeButton,
}) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<ReactNode | null>(null);

  const handleModal = (element: ReactNode): void => {
    if (!open) {
      setComponent(element);
      setOpen(true);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    event.stopPropagation();
    const el = document.getElementById("modal-wrapper");
    if (!el) return;
    if (!el.contains(event.target as Node)) {
      // console.log(target);
      setOpen(false);
      setComponent(null);
    }
  };

  useEffect(() => {
    if (!open) {
      document.body.style.pointerEvents = "all";
      window.removeEventListener("mousedown", handleClickOutside);
      return;
    }
    // prevent propagation, since the modal itself has pointer-events: all
    // it'll override this property.
    document.body.style.pointerEvents = "none";
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const value = {
    open,
    setOpen,
    handleModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {open && (
        <Modal>
          {closeButton && <button onClick={() => setOpen(false)}>x</button>}
          {component}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextI => useContext(ModalContext);
