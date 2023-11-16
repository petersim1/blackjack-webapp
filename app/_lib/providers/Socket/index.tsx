"use client";

import { FC, ReactNode, createContext, useEffect, useContext, useRef } from "react";
import { useGameContext } from "../Game";

import { WebsocketContextI } from "./types";
import { INITIAL_WEBSOCKET_CONTEXT } from "./initialValues";

export const WebsocketContext = createContext<WebsocketContextI>(INITIAL_WEBSOCKET_CONTEXT);

export const WebsocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);

  const { setProfit, setCount, setText, setTotal, setHouseCards, setPlayerCards, setPolicy } =
    useGameContext();

  useEffect(() => {
    // browser API, so must be mounted. Establish the onmessage handler.
    // Should probably push the "gameContext" to a reducer for cleanliness.
    ws.current = new WebSocket("ws://localhost:8080/ws");
    ws.current.onopen = (): void => console.log("open");
    ws.current.onclose = (): void => console.log("close");
    ws.current.onmessage = ({ data }): void => {
      const { balance, count, true_count, text, policy, house_cards, player_cards, player_total } =
        JSON.parse(data);

      console.log(JSON.parse(data));

      setProfit(balance);
      setCount([count, true_count]);
      setText(text);
      setPolicy(policy);
      setHouseCards(house_cards);
      setPlayerCards(player_cards);
      setTotal(player_total);
    };

    const wsCurrent = ws.current;

    return () => {
      // if we just call wsCurrent.close(), the websocket is close
      // before the connection is even made.
      // In this case (at least in React Strict Mode), we'll be able to safely
      // close the existing connection once it's established. 2 will still be made
      // in dev mode, but the 1st one is at least safely cleared.
      if (wsCurrent.readyState === 1) {
        wsCurrent.close();
      } else {
        wsCurrent.onopen = (): void => wsCurrent.close();
      }
    };
  }, [setProfit, setCount, setText, setTotal, setHouseCards, setPlayerCards, setPolicy]);

  return (
    <WebsocketContext.Provider value={{ ws: ws.current }}>{children}</WebsocketContext.Provider>
  );
};

export const useWebsocketContext = (): WebsocketContextI => useContext(WebsocketContext);
