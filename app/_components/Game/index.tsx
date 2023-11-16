import styled from "./styled.module.css";
import Shoe from "./Shoe";

export default (): JSX.Element => {
  return (
    <div className={styled.board}>
      <div className={styled.top_row}>
        <div style={{ width: "200px", height: "100%", flex: "3 0 0" }} />
        <Shoe />
      </div>
    </div>
  );
};
