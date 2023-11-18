export interface RulesI {
  [key: string]: boolean;
}

export interface DeckI {
  shrink_deck: boolean;
  n_decks: number;
  ratio_penetrate: number;
}

export enum Stores {
  RULES = "rules",
  DECK = "deck",
}

export interface RulesLocalStoreI {
  rules: RulesI;
  deck: DeckI;
  state: string;
  updateStore: (store: Stores, data: RulesI | DeckI) => void;
}
