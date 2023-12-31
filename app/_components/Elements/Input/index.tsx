import styled from "@/_components/Elements/styled.module.css";

export default ({
  state,
  min,
  max,
  step,
  setState,
  disabled,
  ...rest
}: {
  state: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  setState: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <label className={styled.number} {...rest}>
      <input
        type="number"
        onChange={setState}
        value={state}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </label>
  );
};
