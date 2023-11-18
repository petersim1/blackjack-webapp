import { useContext, useState, useEffect } from "react";
import { ModalContextI, WsDataContextI, RulesI, RulesLocalStoreI } from "@/_lib/types";
import { ModalContext, WsDataContext } from "@/_lib/providers";
import { rulesDefault } from "../constants";

export const useModalContext = (): ModalContextI => useContext(ModalContext);

export const useWsDataContext = (): WsDataContextI => useContext(WsDataContext);

export const useLocalStorage = (): RulesLocalStoreI => {
  // I could make this a provider, but I currently think it'll
  // only be infrequently accessed, so there's no need.
  // If I start pushing more data to localStorage, I can make it a provider
  // and have useReducer to manage updates + initial gets.
  const [rules, setRules] = useState<RulesI>({ ...rulesDefault });

  const updateStore = (data: RulesI): void => {
    window.localStorage.setItem("--bj-rules", JSON.stringify(data));
    setRules(data);
  };
  useEffect(() => {
    const lRules = window.localStorage.getItem("--bj-rules");
    if (!lRules) {
      window.localStorage.setItem("--bj-rules", JSON.stringify(rulesDefault));
      return;
    }
    setRules(JSON.parse(lRules));
  }, []);

  return {
    rules,
    updateStore,
  };
};
