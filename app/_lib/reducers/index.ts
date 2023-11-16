import { GameDataAggI, GameContextVarsI } from "@/_lib/types";

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
