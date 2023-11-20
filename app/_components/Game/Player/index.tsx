import Card from "@/_components/Elements/Card";
import styled from "../styled.module.css";

export default ({
  cards,
  total,
  hand_result,
}: {
  cards: [string, string][];
  total?: number;
  hand_result?: [string, number];
}): JSX.Element => {
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
          <Card card={card} key={ind} transform={`translateX(${ind * 35}px)`} highlight={true} />
        ))}
        {total && <div className={styled.total}>{total}</div>}
        {hand_result && (
          <p className={styled.result}>
            <span>{hand_result[0]}</span>
            <br />
            <span>{`${hand_result[1] > 0 ? "+" : ""}${hand_result[1]}`} units</span>
          </p>
        )}
      </div>
    </div>
  );
};
