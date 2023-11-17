import styled from "@/_components/Elements/styled.module.css";

export default ({
  state,
  setState,
  ...rest
}: {
  state: boolean;
  setState: () => void;
}): JSX.Element => {
  return (
    <label className={styled.toggle} {...rest}>
      <input type="checkbox" checked={state} onChange={setState} />
      <span className={styled.slider}></span>
    </label>
  );
};
