"use client";

import { useState } from "react";

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
          Count: <span>{gameData.data.count[0]}</span>
        </p>
        <p>
          True Count: <span>{gameData.data.count[1]}</span>
        </p>
      </div>
      <div>
        <Toggle state={show} setState={() => setShow(!show)} />
      </div>
    </div>
  );
};
