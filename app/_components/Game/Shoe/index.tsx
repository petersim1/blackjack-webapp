import Card from "@/_components/Elements/Card";
import styled from "../styled.module.css";

export default ({ percent, cut }: { percent: number; cut: number }): JSX.Element => {
  return (
    <div className={styled.shoe_wrapper}>
      <div className={styled.shoe_holder}>
        {[...Array(4)].map((_, i) => (
          <Card src={"/images/back.png"} key={i} transform={`translateX(${-i * 5}px)`} />
        ))}
      </div>
      <div className={styled.card_fill_container}>
        <div
          className={styled.card_fill}
          style={
            {
              ["--remaining"]: `${100 * percent}%`,
              ["--cut"]: `${100 * cut}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};
