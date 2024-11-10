import styled, {css} from "styled-components";
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

  ${css`
    li {
      display: flex;
      justify-content: center;
    }
  `}
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
      <TaskForm onSubmit={onCreateTask} />
      <StyledContentHeading>Task List</StyledContentHeading>
        {/* über die einzelnen Tasks mapen, um diese einzeln darzustellen */} 
        <StyledTaskList>
        {/* Überprüfen, ob Aufgaben vorhanden sind */}
        {tasks.length > 0 ? (
          // Wenn Aufgaben vorhanden sind, zeige die sortierte Liste an
          sortedTasks.map((task) => {
            return (
              <li key={task.id}>
                <TaskCard 
                  task={task} 
                  onDeleteTask={() => onDeleteTask(task.id)}
                />
              </li>
            )
          })
        ) : (
          // Wenn keine Aufgaben vorhanden sind, zeige eine Meldung an
          <li>No tasks available. Please enter a new task.</li>
        )}
      </StyledTaskList>
    </>
  );
}
