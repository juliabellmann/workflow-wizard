import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import Head from "next/head";
import { StyledContentHeading } from "@/styles";
import NoTaskIcon from "@/assets/icons/notask.svg";
import Image from "next/image";
import { useState } from "react";

export default function HomePage({tasks, onCreateTask, onDeleteTask, toggleDone }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

  // Filtert die Tasks nach dem Suchbegriff
  const filteredTasks = isSearching ? tasks.filter((task) => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <Head>
        <title>Home - Workflow Wizard</title>
      </Head>

    <StyledLogoContainer>
      <Image
          src="/image/Logo.jpeg"
          alt="Logo Workflow Wizard"
          width="150"
          height="150"
          />
    </StyledLogoContainer>

    <div>
        <input
          type="text"
          placeholder="Search task..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearching(e.target.value !== "");
          }}
        />
    </div>

      <StyledDetails>
          <StyledSummary>Create New Task</StyledSummary>
          <TaskForm 
              onSubmit={onCreateTask}  
              onCreateTask={onCreateTask}
          />
      </StyledDetails>

      <StyledContentHeading>Task List</StyledContentHeading>

      <StyledTaskList>

        {/* Wenn nichts gesucht wird und es Aufgaben gibt, zeige sie an: */}
            {!isSearching && tasks.length > 0 ? (
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
                filteredTasks.length > 0 ? (
                // Wenn keine Aufgaben vorhanden sind, zeige eine Meldung an
                <>
                  <StyledListHeading>- Search Results -</StyledListHeading>
                  {filteredTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDeleteTask={() => onDeleteTask(task.id)} 
                      toggleDone={() => toggleDone(task.id)} 
                    />
                  ))}
                </>
              ) : (
                <StyledInfoWrapper>
                    <li>No tasks available. Please enter a new task.</li>
                    <NoTaskIconContainer>
                        <NoTaskIcon />
                    </NoTaskIconContainer>
              </StyledInfoWrapper>
              )
            )}
      </StyledTaskList>
    </>
  );
}


// ----- Styled Components -----

const StyledLogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5vw;
`;

const NoTaskIconContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 5vw;
  width: 5vw;
`;