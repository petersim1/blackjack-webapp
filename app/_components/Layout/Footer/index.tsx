import * as stylex from "@stylexjs/stylex";

import Status from "./status";
import Settings from "./settings";

const styles = stylex.create({
  footer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
    padding: "10px 50px",
  },
});

export default (): JSX.Element => {
  return (
    <footer>
      <div {...stylex.props(styles.footer)}>
        <Status />
        <Settings />
      </div>
    </footer>
  );
};
