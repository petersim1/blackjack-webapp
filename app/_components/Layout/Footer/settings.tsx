"use client";

import { useModalContext } from "@/_lib/providers";
import styled from "../styled.module.css";

const FakeDiv = (): JSX.Element => {
  return <div style={{ height: "300px", width: "300px" }}>Hello modal</div>;
};

export default (): JSX.Element => {
  const { handleModal } = useModalContext();
  return (
    <div className={styled.settings} onClick={() => handleModal(<FakeDiv />)}>
      Settings
    </div>
  );
};
