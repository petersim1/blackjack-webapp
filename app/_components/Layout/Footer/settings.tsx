"use client";
import * as stylex from "@stylexjs/stylex";

import { useModalContext } from "@/_lib/hooks";
import SettingsModal from "@/_components/Elements/Modal/settings";
import { Settings } from "@/_assets";

const styles = stylex.create({
  settings: {
    cursor: "pointer",
  },
});

export default (): JSX.Element => {
  const { handleModal } = useModalContext();
  return (
    <div {...stylex.props(styles.settings)} onClick={() => handleModal(<SettingsModal />)}>
      <Settings fill="white" height="1rem" width="1rem" display="block" />
    </div>
  );
};
