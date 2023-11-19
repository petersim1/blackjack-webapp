import { useContext } from "react";
import { ModalContextI, WsDataContextI, BrowserStoreContextI } from "@/_lib/types";
import { ModalContext, WsDataContext, BrowserStoreContext } from "@/_lib/providers";

export const useModalContext = (): ModalContextI => useContext(ModalContext);

export const useWsDataContext = (): WsDataContextI => useContext(WsDataContext);

export const useLocalStorage = (): BrowserStoreContextI => useContext(BrowserStoreContext);
