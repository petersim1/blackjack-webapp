import Image from "next/image";
import clsx from "clsx";

import { getImgUrl } from "@/_lib/utils";
import styled from "../styled.module.css";

export default ({
  card,
  transform,
  highlight,
}: {
  card: [string, string];
  transform: string;
  highlight?: boolean;
}): JSX.Element => {
  return (
    <div
      className={clsx(styled.card, {
        [styled.active]: typeof highlight == "boolean" && highlight,
        [styled.inactive]: typeof highlight == "boolean" && !highlight,
      })}
      style={{ transform: transform }}
    >
      <Image src={getImgUrl(card)} alt="playing card" fill={true} sizes="any" priority={true} />
    </div>
  );
};
