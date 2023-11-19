import { GameDataAggI, GameContextVarsI, RulesI, DeckI, Stores } from "@/_lib/types";

export const gameReducer = (
  state: GameDataAggI,
  action: { type: string; payload: GameContextVarsI },
): GameDataAggI => {
  switch (action.type) {
    case "STEP":
      return { history: [...state.history, action.payload], data: action.payload };
    default:
      return state;
  }
};

export const BrowserStoreReducer = (
  state: { rules: RulesI; deck: DeckI },
  action: { type: string; data: RulesI | DeckI },
): { rules: RulesI; deck: DeckI } => {
  let lsKey: string;
  let key;
  switch (action.type) {
    case Stores.RULES: {
      lsKey = "--bj-rules";
      key = "rules";
      break;
    }
    case Stores.DECK: {
      lsKey = "--bj-deck";
      key = "deck";
      break;
    }
    default: {
      return state;
    }
  }
  window.localStorage.setItem(lsKey, JSON.stringify(action.data));
  // I can simply return action.data, but to be safe, I'll fetch again from localstorage.
  const data = window.localStorage.getItem(lsKey);
  if (!data) return state;
  return {
    ...state,
    [key]: JSON.parse(data),
  };
};
