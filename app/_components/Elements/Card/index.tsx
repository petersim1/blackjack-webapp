import Image from "next/image";

import { getImgUrl } from "@/_lib/utils";
import styled from "../styled.module.css";

export default ({
  card,
  transform,
}: {
  card: [string, string];
  transform: string;
}): JSX.Element => {
  return (
    <div className={styled.card} style={{ transform: transform }}>
      <Image src={getImgUrl(card)} alt="playing card" fill={true} sizes="any" priority={true} />
    </div>
  );
};
