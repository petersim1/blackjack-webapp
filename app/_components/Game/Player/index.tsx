import Card from "@/_components/Elements/Card";
import styled from "../styled.module.css";

export default ({
  cards,
  total,
  hand_result_text,
  hand_result_profit,
}: {
  cards: [string, string][][];
  total?: number[];
  hand_result_text?: string[];
  hand_result_profit?: number[];
}): JSX.Element => {
  return (
    <div className={styled.player_wrapper}>
      {cards.map((hand, ind) => (
        <div className={styled.hand_holder} key={ind}>
          {hand.map((card, ind2) => (
            <Card card={card} key={ind2} transform={`translateX(${ind * 35}px)`} highlight={true} />
          ))}
          {total && <div className={styled.total}>{total}</div>}
          {hand_result_text && hand_result_profit && (
            <p className={styled.result}>
              <span>{hand_result_text[ind]}</span>
              <br />
              <span>
                {`${hand_result_profit[ind] > 0 ? "+" : ""}${hand_result_profit[ind]}`} units
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
