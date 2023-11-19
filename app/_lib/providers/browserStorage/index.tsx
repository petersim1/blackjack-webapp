"use client";

import { FC, ReactNode, createContext, useReducer, useEffect } from "react";

import { BrowserStoreContextI, Stores } from "@/_lib/types";
import { BrowserStoreReducer } from "@/_lib/reducers";
import { INITIAL_LS_CONTEXT } from "@/_lib/constants";

export const BrowserStoreContext = createContext<BrowserStoreContextI>(INITIAL_LS_CONTEXT);

export const BrowserStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // since we're storing a ref for the ws, re-renders won't be triggered.
  // I'll still want some notion of connection status during renders,
  // so i'll separately store this in a useState.
  const [storeData, updateStore] = useReducer(BrowserStoreReducer, {
    rules: { ...INITIAL_LS_CONTEXT.storeData.rules },
    deck: { ...INITIAL_LS_CONTEXT.storeData.deck },
  });

  useEffect(() => {
    // initialize the store once mounted.
    let data;
    data =
      window.localStorage.getItem("--bj-rules") ||
      JSON.stringify({ ...INITIAL_LS_CONTEXT.storeData.rules });
    if (data) updateStore({ type: Stores.RULES, data: JSON.parse(data) });
    data =
      window.localStorage.getItem("--bj-deck") ||
      JSON.stringify({ ...INITIAL_LS_CONTEXT.storeData.deck });
    if (data) updateStore({ type: Stores.DECK, data: JSON.parse(data) });
  }, []);

  const value = {
    storeData,
    updateStore,
  };

  return <BrowserStoreContext.Provider value={value}>{children}</BrowserStoreContext.Provider>;
};
