import styled from "../styled.module.css";
import Card from "@/_components/Elements/Card";

export default ({ cards }: { cards: [string, string][] }): JSX.Element => {
  return (
    <div className={styled.house_wrapper}>
      {cards.map((card, ind) => (
        <Card card={card} transform={`translateX(${ind * 35}px)`} key={ind} />
      ))}
    </div>
  );
};
