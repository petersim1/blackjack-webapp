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

  return (
    <div className={styled.board}>
      <div className={styled.top_row}>
        <House cards={gameData.data.house_cards} />
        <Shoe percent={gameData.data.cards_remaining} cut={storeData.deck.ratio_penetrate} />
      </div>
      <Player cards={gameData.data.player_cards} total={gameData.data.player_total} />
      <Options data={gameData.data} connected={connected} ws={ws} />
    </div>
  );
};
