import Stats from "./stats";
import History from "./history";
import Count from "./count";
import styles from "../styled.module.css";

export default (): JSX.Element => {
  return (
    <nav>
      <div className={styles.sidebar}>
        <Stats />
        <History />
        <Count />
      </div>
    </nav>
  );
};
