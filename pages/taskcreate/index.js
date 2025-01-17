import styled from "styled-components";
import BtnBack from "@/components/BtnBack";
import TaskForm from "@/components/TaskForm";
import { StyledContentHeading } from "@/styles";

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function MyPlants({ onCreateTask }) {
  return (
    <>
      <BtnBack />

      <StyledContentHeading>New Task</StyledContentHeading>

      <StyledFormWrapper>
        <TaskForm onCreateTask={onCreateTask} />
      </StyledFormWrapper>
    </>
  );
}
