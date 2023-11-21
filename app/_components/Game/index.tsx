"use client";
import { useState } from "react";

import styled from "./styled.module.css";
import Shoe from "./Shoe";
import House from "./House";
import Player from "./Player";
import Options from "./Options";
import Button from "@/_components/Elements/Button";
import Input from "@/_components/Elements/Input";

import { useWsDataContext, useLocalStorage } from "@/_lib/hooks";

export default (): JSX.Element => {
  const { ws, connected, gameData } = useWsDataContext();
  const { storeData } = useLocalStorage();
  const [wager, setWager] = useState(1);

  const handleSend = (): void => {
    if (!ws) return;
    ws.send(JSON.stringify({ code: "init", rules: storeData.rules, deck: storeData.deck }));
  };

  const updateWager = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setWager(Number(value));
  };

  return (
    <div className={styled.board}>
      <div className={styled.top_row}>
        <House cards={gameData.data.house_cards} total={gameData.data.house_total} />
        <Shoe percent={gameData.data.cards_remaining} cut={storeData.deck.ratio_penetrate} />
      </div>
      <Player
        cards={gameData.data.player_cards}
        total={gameData.data.player_total}
        hand_result={gameData.data.hand_result}
      />
      <div className={styled.bottom_row}>
        <Options data={gameData.data} connected={connected} ws={ws} />
        {!gameData.data.ready ? (
          <Button onClick={handleSend} name="Begin Gameplay" disabled={false} color="var(--gray)">
            Begin Gameplay
          </Button>
        ) : (
          <div className={styled.wager}>
            <p>Wager (units)</p>
            <Input
              disabled={!gameData.data.round_over}
              state={wager}
              min={0.1}
              max={10}
              step={0.1}
              setState={updateWager}
            />
          </div>
        )}
      </div>
    </div>
  );
};
