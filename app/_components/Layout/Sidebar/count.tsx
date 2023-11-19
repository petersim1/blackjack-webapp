"use client";

import clsx from "clsx";

import { useWsDataContext, useLocalStorage } from "@/_lib/hooks";
import { Stores } from "@/_lib/types";
import Toggle from "@/_components/Elements/Toggle";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();
  const { storeData, updateStore } = useLocalStorage();

  const handleToggle = (): void => {
    updateStore({ type: Stores.COUNT, data: !storeData.count });
  };

  return (
    <div className={styled.count}>
      <div>
        <p>
          Count:{" "}
          <span className={clsx(styled.sensitive, { [styled.hidden]: !storeData.count })}>
            {gameData.data.count[0]}
          </span>
        </p>
        <p>
          True Count:{" "}
          <span className={clsx(styled.sensitive, { [styled.hidden]: !storeData.count })}>
            {gameData.data.count[1].toFixed(4)}
          </span>
        </p>
      </div>
      <div>
        <Toggle state={storeData.count} setState={handleToggle} />
      </div>
    </div>
  );
};
