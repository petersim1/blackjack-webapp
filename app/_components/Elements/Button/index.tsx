import styled from "../styled.module.css";

export default ({
  onClick,
  name,
  disabled,
  color,
  children,
}: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  disabled: boolean;
  color: string;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      name={name}
      disabled={disabled}
      tabIndex={1}
      className={styled.button}
      style={{ ["--color"]: color } as React.CSSProperties}
    >
      {children}
    </button>
  );
};
