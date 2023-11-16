"use client";

import { useState } from "react";
import clsx from "clsx";

import { useWsDataContext } from "@/_lib/providers";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const [open, setOpen] = useState(false);
  return (
    <div className={styled.history}>
      <div className={styled.selector}>
        <div>History</div>
        <div onClick={() => setOpen(!open)}>v</div>
      </div>
      <div className={clsx(styled.items, { [styled.show]: open })}>
        {gameData.history.map((item, ind) => (
          <div key={ind} className={styled.item}>
            <p>
              {String(item.houseCards)} {item.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
