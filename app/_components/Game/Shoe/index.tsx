import Image from "next/image";
import { cardImgBaseURL } from "@/_lib/utils/constant";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  return (
    <div className={styled.shoe_wrapper}>
      <div className={styled.shoe_holder}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ transform: `translateX(${-i * 5}px)` }}>
            <Image src={cardImgBaseURL + "back.png"} alt="back of card" width={200} height={278} />
          </div>
        ))}
      </div>
      <div className={styled.card_fill_container}>
        <div className={styled.card_fill} />
      </div>
    </div>
  );
};
