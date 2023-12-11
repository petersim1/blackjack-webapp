import * as stylex from "@stylexjs/stylex";
import { globalTokens } from "@/global.stylex";

import Stats from "./stats";
import History from "./history";
import Count from "./count";

const styles = stylex.create({
  aside: {
    gridColumn: "1 / 2",
    gridRow: "1 / 3",
    backgroundColor: globalTokens.bgSecondary,
  },
  sidebar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    paddingBottom: "50px",
    gap: "25px",
  },
});

export default (): JSX.Element => {
  return (
    <aside {...stylex.props(styles.aside)}>
      <div {...stylex.props(styles.sidebar)}>
        <Stats />
        <History />
        <Count />
      </div>
    </aside>
  );
};
