"use client";

import { FC, ReactNode, createContext, useState, useContext } from "react";
import { GameContextI } from "./types";
import { INITIAL_GAME_CONTEXT } from "./initialValues";

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
