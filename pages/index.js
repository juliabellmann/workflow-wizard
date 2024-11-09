import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

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

export default function HomePage({tasks, onCreateTask, onDeleteTask }) {

  // Funktion zum Konvertieren eines Datumsstrings in ein Zeitstempel
  const getDateTimestamp = (dateString) => {
    return new Date(dateString).getTime();
  };

  // Sortieren der Aufgaben nach dueDate (neueste zuerst)
  const sortedTasks = [...tasks].sort((a, b) => {
    return getDateTimestamp(b.dueDate) - getDateTimestamp(a.dueDate);
  });

  return (
    <>
      <StyledContentHeading>Task List</StyledContentHeading>
      <TaskForm  
        onSubmit={onCreateTask} 
      />
      <StyledTaskList>
        {/* über die einzelnen Tasks mapen, um diese einzeln darzustellen */}
        {sortedTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard 
                task={task} 
                onDeleteTask={() => onDeleteTask(task.id)}
              />
            </li>
          )
        })}
      </StyledTaskList>
    </>
  );
}
