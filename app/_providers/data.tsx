"use client";

import {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

const INITIAL_GAME_CONTEXT = {
  profit: 0,
  count: [0, 0],
  text: "",
  total: 0,
  houseCards: [],
  playerCards: [],
  policy: [],
  setProfit: (): void => {},
  setCount: (): void => {},
  setText: (): void => {},
  setTotal: (): void => {},
  setHouseCards: (): void => {},
  setPlayerCards: (): void => {},
  setPolicy: (): void => {},
};

interface GameContextI {
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

export const GameContext = createContext<GameContextI>(INITIAL_GAME_CONTEXT);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profit, setProfit] = useState<number>(INITIAL_GAME_CONTEXT.profit);
  const [count, setCount] = useState<number[]>(INITIAL_GAME_CONTEXT.count);
  const [text, setText] = useState<string>(INITIAL_GAME_CONTEXT.text);
  const [total, setTotal] = useState<number>(INITIAL_GAME_CONTEXT.total);
  const [houseCards, setHouseCards] = useState<[string, string][]>(INITIAL_GAME_CONTEXT.houseCards);
  const [playerCards, setPlayerCards] = useState<[string, string][]>(
    INITIAL_GAME_CONTEXT.playerCards,
  );
  const [policy, setPolicy] = useState<string[]>(INITIAL_GAME_CONTEXT.policy);

  const value = {
    profit,
    count,
    text,
    total,
    houseCards,
    playerCards,
    policy,
    setProfit,
    setCount,
    setText,
    setTotal,
    setHouseCards,
    setPlayerCards,
    setPolicy,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextI => useContext(GameContext);
