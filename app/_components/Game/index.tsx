"use client";
import { useState, useEffect } from "react";
import { Tensor } from "onnxruntime-web";

import styled from "./styled.module.css";
import Shoe from "./Shoe";
import House from "./House";
import Player from "./Player";
import Options from "./Options";
import Button from "@/_components/Elements/Button";
import Input from "@/_components/Elements/Input";

import { useWsDataContext, useLocalStorage } from "@/_lib/hooks";
import { spawnOrtSession } from "@/_lib/utils";

export default (): JSX.Element => {
  const { ws, connected, gameData, gameDispatch } = useWsDataContext();
  const { storeData } = useLocalStorage();
  const [wager, setWager] = useState(1);
  const [qVal, setQval] = useState<(number | undefined)[]>(Array(5).fill(undefined));

  const handleSend = (): void => {
    if (!ws) return;
    // clear the history, reset the game.
    gameDispatch({ type: "CLEAR" });
    ws.send(JSON.stringify({ code: "init", rules: storeData.rules, deck: storeData.deck }));
  };

  const updateWager = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setWager(Number(value));
  };

  const doInference = async (
    player: number,
    house: number,
    policy: string[],
  ): Promise<(number | undefined)[]> => {
    console.log(player, house);
    const session = await spawnOrtSession();
    const data = Float32Array.from([player, house, -1]);
    const tensor = new Tensor("float32", data, [1, 3]);
    const feeds = { [session.inputNames[0]]: tensor };
    const output = await session.run(feeds);

    const result = Array.from(output[session.outputNames[0]].data as Float32Array);
    const toShow: (number | undefined)[] = [];
    ["stay", "hit", "double", "split", "surrender"].forEach((v, i) => {
      if (policy.includes(v)) {
        toShow.push(result[i]);
      } else {
        toShow.push(undefined);
      }
    });

    return toShow;
  };

  useEffect(() => {
    if (!gameData.data.policy) return;
    if (!gameData.data.player_total) return;
    if (gameData.data.current_hand < 0) return;
    const curPlayerTot = gameData.data.player_total[gameData.data.current_hand];
    const houseCard = gameData.data.house_cards[0][0];
    let houseValue;
    if (["J", "Q", "K"].includes(houseCard)) {
      houseValue = 10;
    } else if (houseCard === "A") {
      houseValue = 11;
    } else {
      houseValue = Number(houseCard);
    }
    doInference(curPlayerTot, houseValue, gameData.data.policy).then((result) => {
      setQval(result);
    });
  }, [
    gameData.data.player_total,
    gameData.data.current_hand,
    gameData.data.policy,
    gameData.data.house_cards,
  ]);

  console.log(qVal);

  return (
    <div className={styled.board}>
      {qVal.map((val, ind) => (
        <span key={ind}>{val}</span>
      ))}
      <div className={styled.top_row}>
        <House cards={gameData.data.house_cards} total={gameData.data.house_total} />
        <Shoe percent={gameData.data.cards_remaining} cut={storeData.deck.ratio_penetrate} />
      </div>
      <Player
        cards={gameData.data.player_cards}
        total={gameData.data.player_total}
        hand_result_text={gameData.data.hand_result_text}
        hand_result_profit={gameData.data.hand_result_profit}
        current_hand={gameData.data.current_hand}
      />
      <div className={styled.bottom_row}>
        <Options data={gameData.data} connected={connected} ws={ws} wager={wager} />
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
