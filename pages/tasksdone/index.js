import styled from "styled-components";
import TaskCard from "@/components/TaskCard";

const StyledTaskDoneList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function TasksDone({ tasks, toggleDone, onDeleteTask }) {
  const tasksDone = tasks.filter((task) => task.isDone);


        // toggle für confirm delete
        function toggleDeleteOption() {
          setIsDeleteOption((prevState) => !prevState);
      
          if (toggleButtonName === "Delete") {
            setToggleButtonName("Cancel");
          } else {
            setToggleButtonName("Delete");
          }
      };
      
      // delete und rückführung zur Übersicht
      function handleDelete() {
        setIsDeleting(true);
        onDeleteTask(currentTask.id);
        router.replace('/');
    };

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
              <TaskCard task={task} toggleDone={() => toggleDone(task.id)} onDeleteTask={() => onDeleteTask(task.id)} />
            </li>
          );
        })}
      </StyledTaskDoneList>
    </>
  );
}
