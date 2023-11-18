export interface RulesI {
  [key: string]: boolean;
}

export interface RulesLocalStoreI {
  rules: RulesI;
  updateStore: (data: RulesI) => void;
}
