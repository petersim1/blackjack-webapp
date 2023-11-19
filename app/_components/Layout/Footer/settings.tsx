"use client";

import { useModalContext } from "@/_lib/hooks";
import SettingsModal from "@/_components/Elements/Modal/settings";
import { Settings } from "@/_assets";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { handleModal } = useModalContext();
  return (
    <div className={styled.settings} onClick={() => handleModal(<SettingsModal />)}>
      <Settings fill="white" height="1rem" width="1rem" display="block" />
    </div>
  );
};
