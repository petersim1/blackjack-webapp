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
  state: { rules: RulesI; deck: DeckI; count: boolean },
  action: { type: Stores; data: RulesI | DeckI | boolean },
): { rules: RulesI; deck: DeckI; count: boolean } => {
  const key = action.type.split("-").slice(-1)[0];
  window.localStorage.setItem(action.type, JSON.stringify(action.data));
  // I can simply return action.data, but to be safe, I'll fetch again from localstorage.
  const data = window.localStorage.getItem(action.type);
  if (!data) return state;
  return {
    ...state,
    [key]: JSON.parse(data),
  };
};
