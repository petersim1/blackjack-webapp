"use client";
import * as stylex from "@stylexjs/stylex";

import { useWsDataContext } from "@/_lib/hooks";

const styles = stylex.create({
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
});

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  return (
    <div {...stylex.props(styles.stats)}>
      <h3>{"Let's Play"}</h3>
      <div>
        <p>
          {"Profit (units): "}
          <span>{gameData.data.total_profit}</span>
        </p>
      </div>
    </div>
  );
};
