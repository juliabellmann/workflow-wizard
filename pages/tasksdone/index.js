import styled from "styled-components";
import TaskCard from "@/components/TaskCard";

const StyledTaskDoneList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function TasksDone({ tasks, toggleDone }) {
  const tasksDone = tasks.filter((task) => task.isDone);

  return (
    <>
      <h2>Done List</h2>
      
      {tasksDone.length === 0 && (
        <p>Unfortunately, you have not yet done any tasks.</p>
      )}
      {/* FYI: Icon for error message follows after merge */}
      <StyledTaskDoneList>
        {tasksDone.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard task={task} toggleDone={() => toggleDone(task.id)} />
            </li>
          );
        })}
      </StyledTaskDoneList>
    </>
  );
}
