"use client";
import { useState, useEffect } from "react";

import { GameContextVarsI } from "@/_lib/types/wsData";
import { useWsDataContext } from "@/_lib/hooks";
import Button from "@/_components/Elements/Button";
import { nameColors } from "@/_lib/constants";
import styled from "../styled.module.css";

const defaultDisabled = {
  start: true,
  hit: true,
  stay: true,
  double: true,
  surrender: true,
};

interface DisabledI {
  [key: string]: boolean;
}

export default ({
  ws,
  data,
  connected,
  wager,
}: {
  ws: WebSocket | null;
  data: GameContextVarsI;
  connected: boolean;
  wager: number;
}): JSX.Element => {
  const [disabled, setDisabled] = useState<DisabledI>({ ...defaultDisabled });
  const { gameDispatch, gameData } = useWsDataContext();

  const handleSend = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = event.currentTarget;
    if (connected && ws) {
      if (["hit", "stay", "double", "surrender"].includes(name)) {
        gameDispatch({ type: "MOVE", payload: { ...gameData }, move: name });
        ws.send(JSON.stringify({ code: "step", move: name }));
      } else {
        // TO DO: implement a wager (already implement in backend)
        ws.send(JSON.stringify({ code: name, wager }));
      }
    }
  };

  useEffect(() => {
    if (!connected) {
      setDisabled({ ...defaultDisabled });
      return;
    }
    const newObj: DisabledI = { start: !data.round_over || !data.ready };
    ["stay", "hit", "double", "surrender"].forEach((val) => {
      newObj[val] = !data.policy.includes(val);
    });
    setDisabled(newObj);
  }, [connected, data.round_over, data.policy, data.ready]);

  return (
    <div className={styled.options_holder}>
      {Object.keys(defaultDisabled).map((name, ind) => (
        <Button
          onClick={handleSend}
          name={name}
          key={ind}
          disabled={disabled[name]}
          color={nameColors[name as keyof typeof nameColors]}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
