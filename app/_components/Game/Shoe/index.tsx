import Card from "@/_components/Elements/Card";
import styled from "../styled.module.css";

export default ({ percent }: { percent: number }): JSX.Element => {
  return (
    <div className={styled.shoe_wrapper}>
      <div className={styled.shoe_holder}>
        {[...Array(4)].map((_, i) => (
          <Card card={["Hidden", "Hidden"]} key={i} transform={`translateX(${-i * 5}px)`} />
        ))}
      </div>
      <div className={styled.card_fill_container}>
        <div
          className={styled.card_fill}
          style={{ ["--remaining"]: `${100 * percent}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
