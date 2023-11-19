import styled from "../styled.module.css";

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className={styled.modal_wrapper} id="modal-wrapper">
      <div className={styled.content} id="modal-boundary">
        {children}
      </div>
    </div>
  );
};
