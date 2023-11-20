import styled from "../styled.module.css";
import Card from "@/_components/Elements/Card";

export default ({ cards, total }: { cards: [string, string][]; total?: number }): JSX.Element => {
  return (
    <div className={styled.house_wrapper}>
      <div className={styled.hand_holder}>
        {cards.map((card, ind) => (
          <Card card={card} transform={`translateX(${ind * 35}px)`} key={ind} />
        ))}
        {total && <div className={styled.total}>{total}</div>}
      </div>
    </div>
  );
};
