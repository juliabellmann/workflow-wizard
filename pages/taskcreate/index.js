import styled from "styled-components";
import BtnBack from "@/components/BtnBack";
import TaskForm from "@/components/TaskForm";

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function MyPlants({ onCreateTask }) {

  return (
    <>
      <BtnBack />
          <h2>Create a new Task</h2>
      <StyledFormWrapper>
              <TaskForm
                  onCreateTask={onCreateTask} 
                  isEditMode={false} 
              />
        </StyledFormWrapper>
    </>
  );
}
