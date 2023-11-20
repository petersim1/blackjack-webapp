export interface GameContextVarsI {
  ready: boolean;
  round_over: boolean;
  hand_result?: [string, number];
  round_profit?: number;
  total_profit: number;
  count: number[];
  cards_remaining: number;
  player_total?: number;
  house_total?: number;
  house_cards: [string, string][];
  player_cards: [string, string][];
  policy: string[];
  move?: string;
}

export interface GameDataAggI {
  history: GameContextVarsI[];
  data: GameContextVarsI;
}

export interface WsDataContextI {
  ws: WebSocket | null;
  connected: boolean;
  gameData: GameDataAggI;
  gameDispatch: React.Dispatch<any>;
}
