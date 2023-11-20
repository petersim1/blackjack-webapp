"use client";
// import { useState, useEffect } from "react";

import styled from "./styled.module.css";
import Shoe from "./Shoe";
import House from "./House";
import Player from "./Player";
import Options from "./Options";

import { useWsDataContext, useLocalStorage } from "@/_lib/hooks";

export default (): JSX.Element => {
  const { ws, connected, gameData } = useWsDataContext();
  const { storeData } = useLocalStorage();

  const handleSend = (): void => {
    if (!ws) return;
    ws.send(JSON.stringify({ code: "init", rules: storeData.rules, deck: storeData.deck }));
  };

  return (
    <div className={styled.board}>
      <div className={styled.top_row}>
        <House cards={gameData.data.house_cards} total={gameData.data.house_total} />
        <Shoe percent={gameData.data.cards_remaining} cut={storeData.deck.ratio_penetrate} />
      </div>
      <Player cards={gameData.data.player_cards} total={gameData.data.player_total} />
      {!gameData.data.ready && (
        <div>
          <button onClick={handleSend}>Begin Gameplay</button>
        </div>
      )}
      <Options data={gameData.data} connected={connected} ws={ws} />
    </div>
  );
};
