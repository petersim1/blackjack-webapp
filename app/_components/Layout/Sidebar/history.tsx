"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { globalTokens } from "@/global.stylex";

import { useWsDataContext } from "@/_lib/hooks";
import { nameColors, resColors } from "@/_lib/constants";
import { Hide, Show } from "@/_assets";

const styles = stylex.create({
  history: {
    width: "100%",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    overflow: "hidden",
  },
  selector: {
    width: "100",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "1.5rem",
  },
  items: {
    width: "100%",
    maxHeight: "calc(100% - 1.5rem)",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    visibility: "hidden",
  },
  show: {
    visibility: "visible",
  },
  item: {
    backgroundColor: globalTokens.bgPrimary,
    borderRadius: globalTokens.borderRadius,
    padding: "3px",
    margin: "4px 0",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "0.75rem",
  },
  itemChild: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "calc(0.75rem + 8px)",
  },
  move: {
    padding: "2px 5px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "5px",
    lineHeight: "1em",
  },
});

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
    <div {...stylex.props(styles.history)}>
      <div {...stylex.props(styles.selector)}>
        <div>History</div>
        <div onClick={handleOpen}>
          {open ? (
            <Hide fill="white" width="1rem" display="block" />
          ) : (
            <Show fill="white" width="1rem" display="block" />
          )}
        </div>
      </div>
      <div {...stylex.props(styles.items, open && styles.show)}>
        {gameData.history.map((item, ind) => {
          const houseCards = item.house_cards.map((card) => card[0]).filter((c) => c != "Hidden");
          const playerCards = item.player_cards.map((card) => card[0]);
          console.log(item.move);
          return (
            <div {...stylex.props(styles.item)} key={ind}>
              <div {...stylex.props(styles.itemChild)}>
                <p>Player: {String(playerCards)}</p>
                <div
                  {...stylex.props(styles.move)}
                  style={{
                    borderColor: nameColors[item.move as keyof typeof nameColors] ?? "transparent",
                  }}
                >
                  {item.move}
                </div>
              </div>
              <div {...stylex.props(styles.itemChild)}>
                <p>Player Total: {item.player_total}</p>
              </div>
              <div {...stylex.props(styles.itemChild)}>
                <p>House: {String(houseCards)}</p>
                <div
                  {...stylex.props(styles.move)}
                  style={{
                    borderColor:
                      resColors[item.hand_result_text?.[0] as keyof typeof resColors] ??
                      "transparent",
                  }}
                >
                  {item.hand_result_text?.[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
