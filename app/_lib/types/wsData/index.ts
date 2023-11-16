export interface GameContextVarsI {
  profit: number;
  count: number[];
  text: string;
  total: number;
  houseCards: [string, string][];
  playerCards: [string, string][];
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
