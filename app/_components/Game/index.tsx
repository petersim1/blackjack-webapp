"use client";
import { useState, useEffect } from "react";

import styled from "./styled.module.css";
import Shoe from "./Shoe";
import House from "./House";

import { useWsDataContext } from "@/_lib/providers";

const defaultDisabled = {
  start: true,
  hit: true,
  stay: true,
  double: true,
};

interface DisabledI {
  [key: string]: boolean;
}

export default (): JSX.Element => {
  const [disabled, setDisabled] = useState<DisabledI>({ ...defaultDisabled });
  const { ws, connected, gameData } = useWsDataContext();

  const handleSend = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = event.currentTarget;
    if (connected && ws) {
      if (["hit", "stay", "double"].includes(name)) {
        ws.send(JSON.stringify({ code: "step", move: name }));
      } else {
        ws.send(JSON.stringify({ code: name }));
      }
    }
  };

  useEffect(() => {
    console.log(gameData.data);
    if (!connected) {
      setDisabled({ ...defaultDisabled });
      return;
    }
    const newObj: DisabledI = { start: !gameData.data.round_over };
    ["stay", "hit", "double"].forEach((val) => {
      newObj[val] = !gameData.data.policy.includes(val);
    });
    setDisabled(newObj);
  }, [connected, gameData]);

  return (
    <div className={styled.board}>
      <div className={styled.top_row}>
        <House />
        <Shoe />
      </div>
      <div className={styled.bottom_row}>
        {Object.keys(defaultDisabled).map((name, ind) => (
          <button onClick={handleSend} name={name} key={ind} disabled={disabled[name]}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
