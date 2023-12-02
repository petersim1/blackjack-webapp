"use client";
import { useEffect, useRef } from "react";
import { Tensor } from "onnxruntime-web";
import { select } from "d3";

import styled from "../styled.module.css";

import { useWsDataContext } from "@/_lib/hooks";
import { spawnOrtSession, createViz } from "@/_lib/utils";

const moves = ["stay", "hit", "double", "split", "surrender"];

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const barChartRef = useRef(null);

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
    moves.forEach((v, i) => {
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

    const svg = select(barChartRef.current);
    svg.selectAll("*").remove();

    doInference(curPlayerTot, houseValue, gameData.data.policy).then((result) => {
      createViz(svg, result, moves);
    });
  }, [
    gameData.data.player_total,
    gameData.data.current_hand,
    gameData.data.policy,
    gameData.data.house_cards,
  ]);

  return <div className={styled.graph_holder} ref={barChartRef} />;
};
