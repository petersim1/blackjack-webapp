"use client";

import { useState } from "react";
import clsx from "clsx";

import { useWsDataContext } from "@/_lib/hooks";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    if (!open) {
      const n_history = gameData.history.filter((item) => item.player_total > 0).length;
      if (n_history === 0) return;
    }
    setOpen(!open);
  };
  return (
    <div className={styled.history}>
      <div className={styled.selector} onClick={handleOpen}>
        <div>History</div>
        <div>v</div>
      </div>
      <div className={clsx(styled.items, { [styled.show]: open })}>
        {gameData.history
          .filter((item) => item.player_total > 0)
          .map((item, ind) => (
            <div key={ind} className={styled.item}>
              <p>
                {String(item.house_cards)} {item.player_total}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
