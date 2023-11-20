"use client";

import { useWsDataContext } from "@/_lib/hooks";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  return (
    <div className={styled.stats}>
      <h3>{"Let's Play"}</h3>
      <div>
        <p>
          {"Profit (units): "}
          <span>{gameData.data.total_profit}</span>
        </p>
      </div>
      <div>
        <p>{gameData.data.hand_result && gameData.data.hand_result[0]}</p>
      </div>
    </div>
  );
};
