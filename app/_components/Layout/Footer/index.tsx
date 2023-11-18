import Status from "./status";
import Settings from "./settings";
import styles from "../styled.module.css";

export default (): JSX.Element => {
  return (
    <footer>
      <div className={styles.footer}>
        <Settings />
        <Status />
      </div>
    </footer>
  );
};
