import styled from "../styled.module.css";
import Card from "@/_components/Elements/Card";

export default ({ cards }: { cards: [string, string][] }): JSX.Element => {
  return (
    <div className={styled.player_wrapper}>
      {/* {cards.map((hand, ind) => (
        <div className={styled.player_hand} key={ind}>
          {hand.map((card, ind2) => (
            <div key={ind2} style={{ transform: `translateX(${ind * 35}px)` }}>
              <Image src={getImgUrl(card)} alt="back of card" width={200} height={278} />
            </div>
          ))}
        </div>
      ))} */}
      <div className={styled.hand_holder}>
        {cards.map((card, ind) => (
          <Card card={card} key={ind} transform={`translateX(${ind * 35}px)`} />
        ))}
      </div>
    </div>
  );
};
