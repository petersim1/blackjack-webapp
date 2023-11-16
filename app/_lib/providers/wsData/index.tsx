"use client";

import { FC, ReactNode, createContext, useEffect, useContext, useRef, useReducer } from "react";

import { WsDataContextI } from "@/_lib/types";
import { gameReducer } from "@/_lib/reducers";
import { INITIAL_WSDATA_CONTEXT, INITIAL_GAME_CONTEXT } from "./initialValues";

export const WsDataContext = createContext<WsDataContextI>(INITIAL_WSDATA_CONTEXT);

export const WsDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);
  const [gameData, gameDispatch] = useReducer(gameReducer, {
    history: [],
    data: { ...INITIAL_GAME_CONTEXT },
  });

  useEffect(() => {
    // browser API, so must be mounted. Establish the onmessage handler.
    // Should probably push the "gameContext" to a reducer for cleanliness.
    ws.current = new WebSocket("ws://localhost:8080/ws");
    ws.current.onopen = (): void => console.log("open");
    ws.current.onclose = (): void => console.log("close");
    ws.current.onmessage = ({ data }): void => {
      const incomingMessage = JSON.parse(data);
      gameDispatch({ type: "STEP", payload: { ...incomingMessage } });
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
  }, []);

  const value = {
    ws: ws.current,
    gameData,
  };

  return <WsDataContext.Provider value={value}>{children}</WsDataContext.Provider>;
};

export const useWebsocketContext = (): WsDataContextI => useContext(WsDataContext);
