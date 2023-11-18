import { useContext, useState, useEffect } from "react";
import {
  ModalContextI,
  WsDataContextI,
  RulesI,
  RulesLocalStoreI,
  DeckI,
  Stores,
} from "@/_lib/types";
import { ModalContext, WsDataContext } from "@/_lib/providers";
import { rulesDefault, deckDefault } from "../constants";

export const useModalContext = (): ModalContextI => useContext(ModalContext);

export const useWsDataContext = (): WsDataContextI => useContext(WsDataContext);

export const useLocalStorage = (): RulesLocalStoreI => {
  // I could make this a provider, but I currently think it'll
  // only be infrequently accessed, so there's no need.
  // If I start pushing more data to localStorage, I can make it a provider
  // and have useReducer to manage updates + initial gets.
  const [rules, setRules] = useState<RulesI>({ ...rulesDefault });
  const [deck, setDeck] = useState<DeckI>({ ...deckDefault });
  // state to ensure that localstorage has been read + initialize properly.
  const [state, setState] = useState("NOT_READY");

  const updateStore = (store: Stores, data: RulesI | DeckI): void => {
    setState("UPDATING");
    switch (store) {
      case Stores.RULES: {
        window.localStorage.setItem("--bj-rules", JSON.stringify(data));
        setRules(data as RulesI);
        break;
      }
      case Stores.DECK: {
        window.localStorage.setItem("--bj-deck", JSON.stringify(data));
        setDeck(data as DeckI);
        break;
      }
      default: {
        setState("NOT_READY");
        return;
      }
    }
    setState("READY");
  };
  useEffect(() => {
    const lRules = window.localStorage.getItem("--bj-rules");
    const lDeck = window.localStorage.getItem("--bj-deck");
    if (!lRules || !lDeck) {
      window.localStorage.setItem("--bj-rules", JSON.stringify(rulesDefault));
      window.localStorage.setItem("--bj-deck", JSON.stringify(deckDefault));
      setState("READY");
      return;
    }
    setRules(JSON.parse(lRules));
    setDeck(JSON.parse(lDeck));
    setState("READY");

    return () => {
      setRules({ ...rulesDefault });
      setDeck({ ...deckDefault });
      setState("NOT_READY");
    };
  }, []);

  return {
    rules,
    deck,
    state,
    updateStore,
  };
};
