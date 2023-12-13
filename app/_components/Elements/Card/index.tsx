import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

import styled from "../styled.module.css";

export default ({
  transform,
  highlight,
  src,
}: {
  transform: string;
  highlight?: boolean;
  src: string;
}): JSX.Element => {
  // every re-render will reset this state.
  // re-render is based off "key", which is essentially the image URL
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={clsx(styled.card, {
        [styled.active]: typeof highlight == "boolean" && highlight && loaded,
        [styled.inactive]: typeof highlight == "boolean" && !highlight,
      })}
      style={{ transform: transform }}
    >
      <Image
        src={src}
        alt="playing card"
        loading="eager"
        sizes="any"
        fill={true}
        priority={true}
        placeholder="empty"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
