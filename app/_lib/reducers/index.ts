import { GameDataAggI, GameContextVarsI, RulesI, DeckI, Stores } from "@/_lib/types";

export const gameReducer = (
  state: GameDataAggI,
  action: { type: string; payload: GameContextVarsI; move?: string },
): GameDataAggI => {
  switch (action.type) {
    case "RECEIVE": {
      if (action.payload.player_total) {
        if (action.payload.policy.length > 0) {
          return { history: [...state.history, action.payload], data: action.payload };
        } else {
          if (action.payload.round_over) {
            return { history: [...state.history, action.payload], data: action.payload };
          }
        }
      }
      return { ...state, data: action.payload };
    }
    case "MOVE": {
      const history = [...state.history];
      history[history.length - 1].move = action.move;
      return { ...state, history: history };
    }
    case "CLEAR": {
      return { ...state, history: [] };
    }
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
