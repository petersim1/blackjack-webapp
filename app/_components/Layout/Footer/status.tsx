"use client";
import clsx from "clsx";

import { useWsDataContext } from "@/_lib/providers";
import styled from "@/_components/Layout/styled.module.css";

export default (): JSX.Element => {
  const { connected } = useWsDataContext();
  return (
    <div className={styled.connection}>
      <div className={clsx(styled.marker, { [styled.connected]: connected })} />
      <div>
        ws <span>{connected ? "connected" : "disconnected"}</span>
      </div>
    </div>
  );
};
