import * as stylex from "@stylexjs/stylex";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gridTemplateRows: "1fr 50px",
    width: "100%",
    height: "100vh",
    minHeight: "100vh",
    maxHeight: "100vh",
  },
});

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div {...stylex.props(styles.layout)}>{children}</div>;
};

export { Footer, Sidebar };
