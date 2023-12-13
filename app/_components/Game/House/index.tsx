import styled from "../styled.module.css";
import Card from "@/_components/Elements/Card";
import { getImgUrl } from "@/_lib/utils";

export default ({ cards, total }: { cards: [string, string][]; total?: number }): JSX.Element => {
  return (
    <div className={styled.house_wrapper}>
      <div className={styled.hand_holder}>
        {cards.map((card, ind) => {
          const src = getImgUrl(card);
          // need to force this to be unique.
          // can't just be "ind", I want it to unmount when the card
          // at a given "ind" changes.
          const key = src + String(ind);
          return <Card src={src} transform={`translateX(${ind * 35}px)`} key={key} />;
        })}
        {total && <div className={styled.total}>{total}</div>}
      </div>
    </div>
  );
};
