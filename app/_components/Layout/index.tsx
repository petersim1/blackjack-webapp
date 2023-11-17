import styles from "./styled.module.css";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className={styles.layout}>{children}</div>;
};

export { Footer, Sidebar };
