import Status from "./status";
import styles from "../styled.module.css";

export default (): JSX.Element => {
  return (
    <footer>
      <div className={styles.footer}>
        <Status />
      </div>
    </footer>
  );
};
