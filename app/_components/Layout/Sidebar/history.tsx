"use client";

import { useState } from "react";
import clsx from "clsx";

import { useWsDataContext } from "@/_lib/hooks";
import { nameColors, resColors } from "@/_lib/constants";
import { Hide } from "@/_assets";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    if (!open) {
      const n_history = gameData.history.length;
      if (n_history === 0) return;
    }
    setOpen(!open);
  };
  return (
    <div className={styled.history}>
      <div className={styled.selector}>
        <div>History</div>
        <div onClick={handleOpen}>
          <Hide fill="white" height="1rem" display="block" />
        </div>
      </div>
      <div className={clsx(styled.items, { [styled.show]: open })}>
        {gameData.history.map((item, ind) => {
          const houseCards = item.house_cards.map((card) => card[0]).filter((c) => c != "Hidden");
          const playerCards = item.player_cards.map((card) => card[0]);
          return (
            <div key={ind} className={styled.item}>
              <div>
                <p>Player: {String(playerCards)}</p>
                <div
                  className={styled.move}
                  style={
                    {
                      ["--color"]: nameColors[item.move as keyof typeof nameColors],
                    } as React.CSSProperties
                  }
                >
                  {item.move}
                </div>
              </div>
              <div>
                <p>Player Total: {item.player_total}</p>
              </div>
              <div>
                <p>House: {String(houseCards)}</p>
                <div
                  className={styled.move}
                  style={
                    {
                      ["--color"]: resColors[item.hand_result?.[0] as keyof typeof resColors],
                    } as React.CSSProperties
                  }
                >
                  {item.hand_result?.[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
