export interface GameContextVarsI {
  ready: boolean;
  round_over: boolean;
  hand_result_text?: string[];
  hand_result_profit?: number[];
  total_profit: number;
  count: number[]; // This is really a tuple of [number, number]...
  cards_remaining: number;
  player_total?: number[];
  house_total?: number;
  house_cards: [string, string][];
  player_cards: [string, string][][];
  policy: string[];
  current_hand: number;
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
