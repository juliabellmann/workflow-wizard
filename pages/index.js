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

export default function HomePage({tasks, onCreateTask, onDeleteTask, toggleDone }) {

  // Funktion zum Konvertieren eines Datumsstrings in ein Zeitstempel
  const getDateTimestamp = (dateString) => {
    return new Date(dateString).getTime();
  };

  // Sortieren der Aufgaben nach dueDate (neueste zuerst)
  const sortedTasks = [...tasks].sort((a, b) => {
    return getDateTimestamp(b.dueDate) - getDateTimestamp(a.dueDate);
  });

  // Filtert die Tasks nach Done und undone und sortiert sie gleich nach dueDate
  const undoneTasks = sortedTasks.filter(task => !task.isDone);
  const doneTasks = sortedTasks.filter(task => task.isDone);

  return (
    <>
      <TaskForm onSubmit={onCreateTask} />
      <StyledContentHeading>Task List</StyledContentHeading>

      <StyledTaskList>
        {/* Wenn es Aufgaben gibt, zeige sie an: */}
        {tasks.length > 0 ? (
          <>
            <h2>To Do</h2>
            {undoneTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDeleteTask={() => onDeleteTask(task.id)} 
                toggleDone={() => toggleDone(task.id)} 
              />
            ))}
            
            {doneTasks.length > 0 && (
              <>
                <h2>Done</h2>
                {doneTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDeleteTask={() => onDeleteTask(task.id)} 
                    toggleDone={() => toggleDone(task.id)} 
                  />
                ))}
              </>
            )}
          </>
        ) : (
          // Wenn keine Aufgaben vorhanden sind, zeige eine Meldung an
          <li>No tasks available. Please enter a new task.</li>
        )}
      </StyledTaskList>
    </>
  );
}
