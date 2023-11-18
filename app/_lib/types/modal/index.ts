import { Dispatch, SetStateAction, ReactNode } from "react";

export interface ModalContextI {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleModal: (element: ReactNode) => void;
}
