import styled from "styled-components";
import TaskCard from "@/components/TaskCard";

// ----- Styled Components -----

const StyledContentHeading = styled.h2`
  display: flex;
  justify-content: center;
`;

const StyledTaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function HomePage({tasks}) {
  return (
    <>
      <StyledContentHeading>Task List</StyledContentHeading>
      <StyledTaskList>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          )
        })}
      </StyledTaskList>
    </>
  );
}
