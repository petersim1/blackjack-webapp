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
    model_inputs: [number, number, number],
    policy: string[],
  ): Promise<{ move: string; value: number }[]> => {
    const session = await spawnOrtSession();
    const data = Float32Array.from([...model_inputs]);
    const tensor = new Tensor("float32", data, [1, 3]);
    const feeds = { [session.inputNames[0]]: tensor };
    const output = await session.run(feeds);

    const result = Array.from(output[session.outputNames[0]].data as Float32Array);

    const toShow: { move: string; value: number }[] = [];
    moves.forEach((move, i) => {
      if (policy.includes(move)) {
        toShow.push({ move, value: result[i] });
      }
    });

    return toShow;
  };

  useEffect(() => {
    if (!gameData.data.model) return;
    const svg = select(barChartRef.current);
    svg.selectAll("*").remove();

    doInference(gameData.data.model, gameData.data.policy).then((result) => {
      createViz(svg, result, moves);
    });
  }, [gameData.data.policy, gameData.data.model]);

  return <div className={styled.graph_holder} ref={barChartRef} />;
};
