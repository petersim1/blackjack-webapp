"use client";

import { FC, ReactNode, createContext, useEffect, useRef, useState, useReducer } from "react";

import { WsDataContextI } from "@/_lib/types";
import { gameReducer } from "@/_lib/reducers";
import { INITIAL_WSDATA_CONTEXT, INITIAL_GAME_CONTEXT } from "@/_lib/constants";

export const WsDataContext = createContext<WsDataContextI>(INITIAL_WSDATA_CONTEXT);

export const WsDataProvider: FC<{ children: ReactNode; url: string }> = ({ children, url }) => {
  const ws = useRef<WebSocket | null>(null);
  // since we're storing a ref for the ws, re-renders won't be triggered.
  // I'll still want some notion of connection status during renders,
  // so i'll separately store this in a useState.
  const [connected, setConnected] = useState(false);
  const [gameData, gameDispatch] = useReducer(gameReducer, {
    history: [],
    data: { ...INITIAL_GAME_CONTEXT },
  });

  useEffect(() => {
    // browser API, so must be mounted. Establish the onmessage handler.
    // Should probably push the "gameContext" to a reducer for cleanliness.
    ws.current = new WebSocket(url);
    ws.current.onopen = (): void => {
      console.log("open");
      setConnected(true);
    };
    ws.current.onclose = (): void => {
      console.log("close");
      setConnected(false);
    };
    ws.current.onmessage = ({ data }): void => {
      const incomingMessage = JSON.parse(data);
      if (incomingMessage.type === "ping" && ws.current !== null) {
        console.log("heartbeat");
        ws.current.send(JSON.stringify({ code: "pong" }));
        return;
      }
      gameDispatch({ type: "RECEIVE", payload: { ...incomingMessage } });
    };

    const wsCurrent = ws.current;

    return () => {
      // if we just call wsCurrent.close(), the websocket is close
      // before the connection is even made.
      // In this case (at least in React Strict Mode), we'll be able to safely
      // close the existing connection once it's established. 2 will still be made
      // in dev mode, but the 1st one is at least safely cleared.
      if (wsCurrent.readyState === wsCurrent.OPEN) {
        wsCurrent.close();
      } else {
        wsCurrent.onopen = (): void => wsCurrent.close();
      }
      setConnected(false);
    };
  }, [url]);

  const value = {
    ws: ws.current,
    gameData,
    gameDispatch,
    connected,
  };

  return <WsDataContext.Provider value={value}>{children}</WsDataContext.Provider>;
};
