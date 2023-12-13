"use client";
import * as stylex from "@stylexjs/stylex";
import { colors, animations } from "../../../global.stylex";

import { useWsDataContext } from "@/_lib/hooks";

const styles = stylex.create({
  connection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "0.75rem",
    gap: "5px",
  },
  marker: {
    height: "7px",
    width: "7px",
    borderRadius: "100%",
    color: colors.disconnected,
    position: "relative",
    backgroundColor: "currentColor",
    "::before": {
      content: "",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      borderRadius: "100%",
      backgroundColor: "currentColor",
      willChange: "filter",
      animationName: animations.pulse,
      animationDuration: "2s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    },
  },
  connected: {
    color: colors.connected,
  },
});

export default (): JSX.Element => {
  const { connected } = useWsDataContext();
  return (
    <div {...stylex.props(styles.connection)}>
      <div {...stylex.props(styles.marker, connected && styles.connected)} />
      <div>
        ws <span>{connected ? "connected" : "disconnected"}</span>
      </div>
    </div>
  );
};
