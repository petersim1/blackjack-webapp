"use client";

import { FC, ReactNode, createContext, useState, useEffect, useContext } from "react";
import { useGameContext } from "./data";

const INITIAL_WEBSOCKET_CONTEXT = {
  ws: null,
};

interface WebsocketContextI {
  ws: null | WebSocket;
}

export const WebsocketContext = createContext<WebsocketContextI>(INITIAL_WEBSOCKET_CONTEXT);

export const WebsocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<null | WebSocket>(INITIAL_WEBSOCKET_CONTEXT.ws);
  const { setProfit, setCount, setText, setTotal, setHouseCards, setPlayerCards, setPolicy } =
    useGameContext();

  useEffect(() => {
    // browser API, so must be mounted. Establish the onmessage handler.
    // Should probably push the "gameContext" to a reducer for cleanliness.
    const socket = new WebSocket("ws://localhost:8080/ws");
    socket.onmessage = ({ data }): void => {
      const { balance, count, true_count, text, policy, house_cards, player_cards, player_total } =
        JSON.parse(data);

      setProfit(balance);
      setCount([count, true_count]);
      setText(text);
      setPolicy(policy);
      setHouseCards(house_cards);
      setPlayerCards(player_cards);
      setTotal(player_total);
    };

    setWs(socket);

    return () => {
      socket.close();
      setWs(null);
    };
  }, [setProfit, setCount, setText, setTotal, setHouseCards, setPlayerCards, setPolicy]);

  return <WebsocketContext.Provider value={{ ws }}>{children}</WebsocketContext.Provider>;
};

export const useScrollContext = (): WebsocketContextI => useContext(WebsocketContext);
