export interface GameContextVarsI {
  profit: number;
  count: number[];
  text: string;
  total: number;
  house_cards: [string, string][];
  player_cards: [string, string][];
  policy: string[];
}

export interface GameDataAggI {
  history: GameContextVarsI[];
  data: GameContextVarsI;
}

export interface WsDataContextI {
  ws: WebSocket | null;
  connected: boolean;
  gameData: GameDataAggI;
}
