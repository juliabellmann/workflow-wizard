import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import ButtonBack from "@/components/BtnBack";
import Image from "next/image";
import { StyledContentHeading } from "@/styles";
import useSWR from "swr";

const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 50px;

  margin: 50px 0;
`;
const StyledParagraph = styled.p`
  text-align: center;
`;

export default function TasksDone({ toggleDone, onDeleteTask }) {
  const { data: tasks, mutate } = useSWR("/api/tasks", { fallbackData: [] });
  const tasksDone = tasks.filter((task) => task.isDone);

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

  async function handleDelete(id) {
    console.log("id", id);
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    mutate();
  }

  return (
    <>
      <ButtonBack />

      <StyledContentHeading>Done List</StyledContentHeading>

      {tasksDone.length === 0 && (
        <StyledFlexbox>
          <StyledParagraph>
            Unfortunately, you have not yet done any tasks.
          </StyledParagraph>
          <Image
            src={"/icons/notask.svg"}
            alt={"Icon of empty task"}
            width="50"
            height="50"
          />
        </StyledFlexbox>
      )}
      {/* FYI: Icon for error message follows after merge */}
      <ul>
        {tasksDone.map((task) => {
          return (
            <li key={task._id}>
              <TaskCard
                task={task}
                toggleDone={() => handleToggleTask(task)}
                onDeleteTask={() => handleDelete(task._id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
