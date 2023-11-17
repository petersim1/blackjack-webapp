export interface GameContextVarsI {
  cards_remaining: number;
  round_over: boolean;
  deal_house: boolean;
  deal_player: boolean;
  profit: number;
  count: number[];
  text: string;
  player_total: number;
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
