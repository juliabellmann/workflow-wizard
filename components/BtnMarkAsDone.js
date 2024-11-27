import styled from "styled-components";
import CheckedDone from "@/assets/icons/square-check-regular.svg";
import NotCheckedDone from "@/assets/icons/square-regular.svg";

const StyledDoneButton = styled.button`
  position: absolute;
  top: 0;
  right: 15px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  width: 48px;
  padding: var(--padding-icons);

  border: var(--border-btn);
  border-top: 0;
  border-radius: 0 0 5px 5px;

  background-color: var(--bg-color-btn);
  fill: var(--text-color);
`;

export default function BtnMarkAsDone({ isDone, toggleDone, id }) {
  return (
    <StyledDoneButton onClick={() => toggleDone(id)}>
      {isDone ? <CheckedDone /> : <NotCheckedDone />}
    </StyledDoneButton>
  );
}
