"use client";

import { useModalContext } from "@/_lib/providers";
import SettingsModal from "@/_components/Elements/Modal/settings";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { handleModal } = useModalContext();
  return (
    <div className={styled.settings} onClick={() => handleModal(<SettingsModal />)}>
      Settings
    </div>
  );
};
