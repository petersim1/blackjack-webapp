"use client";
import Image from "next/image";

import { useWsDataContext } from "@/_lib/providers";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { gameData } = useWsDataContext();

  const getImgUrl = (card: [number | string, string]): string => {
    const [cardVal, suit] = card;
    if (suit === "Hidden") {
      return "/images/back.png";
    }
    return "/images/" + String(cardVal) + suit + ".png";
  };

  return (
    <div className={styled.house_wrapper}>
      {gameData.data.house_cards.map((card, ind) => (
        <div key={ind} style={{ transform: `translateX(${ind * 20}px)` }}>
          <Image src={getImgUrl(card)} alt="back of card" width={200} height={278} />
        </div>
      ))}
    </div>
  );
};
