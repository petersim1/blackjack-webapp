"use client";

import { FC, ReactNode, createContext, useReducer, useEffect, useState } from "react";

import { BrowserStoreContextI, StorageAggI, Stores } from "@/_lib/types";
import { BrowserStoreReducer } from "@/_lib/reducers";
import { INITIAL_LS_CONTEXT } from "@/_lib/constants";

export const BrowserStoreContext = createContext<BrowserStoreContextI>(INITIAL_LS_CONTEXT);

export const BrowserStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // since we're storing a ref for the ws, re-renders won't be triggered.
  // I'll still want some notion of connection status during renders,
  // so i'll separately store this in a useState.
  const [ready, setReady] = useState(false);
  const [storeData, updateStore] = useReducer(BrowserStoreReducer, {
    rules: { ...INITIAL_LS_CONTEXT.storeData.rules },
    deck: { ...INITIAL_LS_CONTEXT.storeData.deck },
    count: INITIAL_LS_CONTEXT.storeData.count,
  });

  useEffect(() => {
    // initialize the store once mounted.
    Object.values(Stores).forEach((store) => {
      const keyName = store.split("-").slice(-1)[0];
      const defaultObj = JSON.stringify(INITIAL_LS_CONTEXT.storeData[keyName as keyof StorageAggI]);
      const data = window.localStorage.getItem(store) || defaultObj;
      updateStore({ type: store, data: JSON.parse(data) });
    });
    setReady(true);
    // TO DO: add logic that tells us when LocalStorage is updated
    // This prevents flashing of default values.
  }, []);

  const value = {
    ready,
    storeData,
    updateStore,
  };

  return <BrowserStoreContext.Provider value={value}>{children}</BrowserStoreContext.Provider>;
};
