// import styles from "./styled.module.css";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

import { css } from "@/styled-system/css";

const styles = css({
  display: "grid",
  gridTemplateColumns: "250px 1fr",
  gridTemplateRows: "1fr 50px",
  width: "100%",
  height: "100vh",
  minHeight: "100vh",
  maxHeight: "100vh",
});

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className={styles}>{children}</div>;
};

export { Footer, Sidebar };
