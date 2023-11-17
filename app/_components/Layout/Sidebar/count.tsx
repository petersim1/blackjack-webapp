"use client";

import { useState } from "react";
import clsx from "clsx";

import { useWsDataContext } from "@/_lib/providers";
import Toggle from "@/_components/Elements/Toggle";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const [show, setShow] = useState(true);
  return (
    <div className={styled.count}>
      <div>
        <p>
          Count:{" "}
          <span className={clsx(styled.sensitive, { [styled.hidden]: !show })}>
            {gameData.data.count[0]}
          </span>
        </p>
        <p>
          True Count:{" "}
          <span className={clsx(styled.sensitive, { [styled.hidden]: !show })}>
            {gameData.data.count[1].toFixed(4)}
          </span>
        </p>
      </div>
      <div>
        <Toggle state={show} setState={() => setShow(!show)} />
      </div>
    </div>
  );
};
