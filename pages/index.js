import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import Head from "next/head";
import { StyledContentHeading } from "@/styles";

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
      <Head>
        <title>Home - Workflow Wizard</title>
      </Head>

      <StyledDetails>
          <StyledSummary>Create New Task</StyledSummary>
          <TaskForm 
              onSubmit={onCreateTask}  
              onCreateTask={onCreateTask}
          />
      </StyledDetails>

      <StyledContentHeading>Task List</StyledContentHeading>

      <StyledTaskList>
        {/* Wenn es Aufgaben gibt, zeige sie an: */}
        {tasks.length > 0 ? (
          <>
            <StyledListHeading>- To Do -</StyledListHeading>
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
                <StyledListHeading>- Done -</StyledListHeading>
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

// ----- Styled Components -----

const StyledDetails = styled.details`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const StyledSummary = styled.summary`
  border: 1px solid black;
  border-radius: var(--border-radius-btn);

  padding: var(--padding-btn);
  margin-top: 20px;
`;

const StyledListHeading = styled.h3`
  display: flex;
  justify-content: center;
  margin: 20px 0 10px 0;
`;

const StyledTaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
