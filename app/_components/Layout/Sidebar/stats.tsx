"use client";

import { useWsDataContext } from "@/_lib/providers";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  return (
    <div className={styled.stats}>
      <h3>{"Let's Play"}</h3>
      <div>
        <p>
          {"Profit (units): "}
          <span>{gameData.data.profit}</span>
        </p>
      </div>
      <div>
        <p>{gameData.data.text}</p>
      </div>
    </div>
  );
};
