import { useContext } from "react";
import { ModalContextI, WsDataContextI } from "@/_lib/types";
import { ModalContext, WsDataContext } from "@/_lib/providers";

export const useModalContext = (): ModalContextI => useContext(ModalContext);

export const useWsDataContext = (): WsDataContextI => useContext(WsDataContext);
