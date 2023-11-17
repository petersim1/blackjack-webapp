"use client";
import { useState, useEffect } from "react";

import styled from "../styled.module.css";

import { GameContextVarsI } from "@/_lib/types/wsData";

const defaultDisabled = {
  start: true,
  hit: true,
  stay: true,
  double: true,
};

interface DisabledI {
  [key: string]: boolean;
}

export default ({
  ws,
  data,
  connected,
}: {
  ws: WebSocket | null;
  data: GameContextVarsI;
  connected: boolean;
}): JSX.Element => {
  const [disabled, setDisabled] = useState<DisabledI>({ ...defaultDisabled });

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
    if (!connected) {
      setDisabled({ ...defaultDisabled });
      return;
    }
    const newObj: DisabledI = { start: !data.round_over };
    ["stay", "hit", "double"].forEach((val) => {
      newObj[val] = !data.policy.includes(val);
    });
    setDisabled(newObj);
  }, [connected, data.round_over, data.policy]);

  return (
    <div className={styled.options_holder}>
      {Object.keys(defaultDisabled).map((name, ind) => (
        <button onClick={handleSend} name={name} key={ind} disabled={disabled[name]} tabIndex={1}>
          {name}
        </button>
      ))}
    </div>
  );
};
