export interface RulesI {
  allow_surrender: boolean;
  dealer_hit_soft17: boolean;
  double_after_split: boolean;
  hit_after_split_aces: boolean;
  push_dealer22: boolean;
  reduced_blackjack_payout: boolean;
  split_any_ten: boolean;
}

export interface DeckI {
  shrink_deck: boolean;
  n_decks: number;
  ratio_penetrate: number;
}

export enum Stores {
  RULES = "--bj-rules",
  DECK = "--bj-deck",
  COUNT = "--bj-count",
}

export interface StorageAggI {
  rules: RulesI;
  deck: DeckI;
  count: boolean;
}

export interface BrowserStoreContextI {
  ready: boolean;
  storeData: StorageAggI;
  updateStore: React.Dispatch<{ type: Stores; data: RulesI | DeckI | boolean }>;
}
