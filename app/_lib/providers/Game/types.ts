import { Dispatch, SetStateAction } from "react";

export interface GameContextI {
  profit: number;
  count: number[];
  text: string;
  total: number;
  houseCards: [string, string][];
  playerCards: [string, string][];
  policy: string[];
  setProfit: Dispatch<SetStateAction<number>>;
  setCount: Dispatch<SetStateAction<number[]>>;
  setText: Dispatch<SetStateAction<string>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setHouseCards: Dispatch<SetStateAction<[string, string][]>>;
  setPlayerCards: Dispatch<SetStateAction<[string, string][]>>;
  setPolicy: Dispatch<SetStateAction<string[]>>;
}
