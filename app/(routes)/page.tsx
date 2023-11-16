"use client";

import { useWsDataContext } from "@/_lib/providers";
import styles from "./page.module.css";

export default (): JSX.Element => {
  const { ws, connected } = useWsDataContext();

  const submitReq = (): void => {
    if (!ws) return;
    ws.send(JSON.stringify({ code: "start" }));
  };

  const closeReq = (): void => {
    if (!ws) return;
    ws.send(JSON.stringify({ code: "close" }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button onClick={submitReq}>test</button>
        <button onClick={closeReq}>close</button>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: connected ? "green" : "red",
          }}
        >
          Status
        </div>
      </div>
    </main>
  );
};
