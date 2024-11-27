import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import Head from "next/head";
import NoTaskIcon from "@/assets/icons/notask.svg";
import { useState } from "react";
import SearchIcon from "@/assets/icons/magnifying-glass.svg";
import useSWR from "swr";
import BtnToggleMode from "@/components/BtnToggleMode";


export default function HomePage({ onCreateTask, onDeleteTask, toggleDone }) {
  const { data: tasks, mutate } = useSWR("/api/tasks", { fallbackData: [] });

  console.log("tasks", tasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  async function handleAddTask(place) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(place),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function handleDelete(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    mutate();
  }

  async function handleToggleTask(currentTask) {
    try {
      const response = await fetch(`/api/tasks/${currentTask._id}`, {
        method: "PUT",
        body: JSON.stringify({
          // Signalisiert das Togglen der Task
          isToggleDone: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle task: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Task toggled successfully:", data);
      // Aktualisiere die SWR-Daten
      mutate();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  // Funktion zum Konvertieren eines Datumsstrings in ein Zeitstempel
  const getDateTimestamp = (dateString) => {
    return new Date(dateString).getTime();
  };

  // Sortieren der Aufgaben nach dueDate (neueste zuerst)
  const sortedTasks = [...tasks].sort((a, b) => {
    return getDateTimestamp(b.dueDate) - getDateTimestamp(a.dueDate);
  });

  // Filtert die Tasks nach Done und undone und sortiert sie gleich nach dueDate
  const undoneTasks = sortedTasks.filter((task) => !task.isDone);
  const doneTasks = sortedTasks.filter((task) => task.isDone);

  // Filtert die Tasks nach dem Suchbegriff
  const filteredTasks = isSearching
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Head>
        <title>Home - Workflow Wizard</title>
      </Head>

    <StyledUpperWrapper>


      <StyledToggleContainer $isactive>
        <BtnToggleMode />
      </StyledToggleContainer>




      {/* Searchbar */}
      <StyledSearchContainer>
        <StyledSearchIcon  onClick={toggleSearch}>
          <SearchIcon />
        </StyledSearchIcon>
        {isExpanded && (
        <StyledSearch
          type="text"
          placeholder="Search task..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearching(e.target.value !== "");
          }}
          />
        )}
      </StyledSearchContainer>
      </StyledUpperWrapper>

            {/* Toggle Create new Task */}
            <StyledDetails>
        <StyledSummary>Create New Task</StyledSummary>
        <TaskForm onCreateTask={handleAddTask} />
      </StyledDetails>

          <StyledContentHeading>Task List</StyledContentHeading>
      <StyledTaskList>
        {/* Wenn nichts gesucht wird und es Aufgaben gibt, zeige sie an: */}
        {!isSearching && tasks.length > 0 ? (
          <>
            <StyledListHeading>- To Do -</StyledListHeading>
            {undoneTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDeleteTask={() => handleDelete(task._id)}
                toggleDone={handleToggleTask}
              />
            ))}

            {doneTasks.length > 0 && (
              <>
                <StyledListHeading>- Done -</StyledListHeading>
                {doneTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDeleteTask={() => onDeleteTask(task.id)}
                    toggleDone={() => handleToggleTask(task)}
                  />
                ))}
              </>
            )}
          </>
        ) : filteredTasks.length > 0 ? (
          <>
            <StyledListHeading>- Search Results -</StyledListHeading>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDeleteTask={() => onDeleteTask(task.id)}
                toggleDone={() => handleToggleTask(task)}
              />
            ))}
          </>
        ) : (
          <StyledInfoWrapper>
            {/* Wenn keine Aufgaben vorhanden sind, zeige eine Meldung an */}
            <li>No tasks available. Please enter a new task.</li>
            <NoTaskIconContainer>
              <NoTaskIcon />
            </NoTaskIconContainer>
          </StyledInfoWrapper>
        )}
      </StyledTaskList>
    </>
  );
}

// ----- Styled Components -----

const StyledContentHeading = styled.h2`
  display: flex;
  justify-content: center;
  margin: 5px 0;
  font-family: var(--font-family-heading);
  letter-spacing: 3px;
`;

const StyledUpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 20px;
`;

const StyledSearchIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 48px;

  padding: var(--padding-icons);

  background-color: var(--bg-color-btn);
  border: 2px solid var(--accent-color);
  border-radius: 50%;

  fill: var(--text-color);
`;

const StyledSearch = styled.input`
  padding: 12px 5px;
  border-radius: var(--border-radius-input);
  background-color: var(--bg-color-card);
  margin-bottom: 10px;
  width: 200px;
`;

const StyledDetails = styled.details`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSummary = styled.summary`
  border: var(--border-btn);
  border-radius: var(--border-radius-btn);

  padding: 10px 15px 10px 15px;
  /* margin-top: 20px; */
  background-color: var(--bg-color-btn);
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

const StyledListHeading = styled.h3`
  display: flex;
  justify-content: center;
  margin: 5px 0 5px 0;
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

const StyledToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  border-radius: 50%;

  fill: ${({ $isactive }) => ($isactive ? "var(--accent-color)" : "var(--text-color)")};
  background-color: ${({ $isactive }) =>
    $isactive ? "var(--bg-color-btn)" : ""};
  border: ${({ $isactive }) =>
    $isactive ? "2px solid var(--accent-color)" : ""};
  /* border-radius: ${({ $isactive }) => ($isactive ? "5px" : "5px")}; */
  text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;