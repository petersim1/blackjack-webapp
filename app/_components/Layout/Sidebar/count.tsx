"use client";

import * as stylex from "@stylexjs/stylex";

import { useWsDataContext, useLocalStorage } from "@/_lib/hooks";
import { Stores } from "@/_lib/types";
import Toggle from "@/_components/Elements/Toggle";

const styles = stylex.create({
  count: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  sensitive: {
    display: "inline-block",
    position: "relative",
  },
  hidden: {
    visibility: "hidden",
    "::after": {
      content: "",
      position: "absolute",
      visibility: "visible",
      top: "0",
      left: "0",
      bottom: "0",
      width: "20px",
      backgroundColor: "white",
      filter: "blur(2px)",
    },
  },
});

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const { storeData, updateStore } = useLocalStorage();

  const handleToggle = (): void => {
    updateStore({ type: Stores.COUNT, data: !storeData.count });
  };

  return (
    <div {...stylex.props(styles.count)}>
      <div>
        <p>
          Count:{" "}
          <span {...stylex.props(styles.sensitive, !storeData.count && styles.hidden)}>
            {gameData.data.count[0]}
          </span>
        </p>
        <p>
          True Count:{" "}
          <span {...stylex.props(styles.sensitive, !storeData.count && styles.hidden)}>
            {gameData.data.count[1].toFixed(4)}
          </span>
        </p>
      </div>
      <div>
        <Toggle state={storeData.count} setState={handleToggle} />
      </div>
    </div>
  );
};
