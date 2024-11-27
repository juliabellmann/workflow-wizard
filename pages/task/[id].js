import BtnBack from "@/components/BtnBack";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Head from "next/head";
import TaskForm from "@/components/TaskForm";
import { StyledCardDate, StyledContentHeading } from "@/styles";
import CalenderIcon from "@/assets/icons/calendar-regular.svg";
import EditIcon from "@/assets/icons/pencil-solid.svg";
import TrashIcon from "@/assets/icons/trash-can-regular.svg";
import NoTrashIcon from "@/assets/icons/rectangle-xmark-regular.svg";
import useSWR from "swr";


export default function TaskDetails({ onCreateTask, toggleDone }) {
  const [isDeleteOption, setIsDeleteOption] = useState(false);
  const [toggleButtonName, setToggleButtonName] = useState("Delete");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: currentTask,
    isLoading,
    mutate,
    error,
  } = useSWR(`/api/tasks/${id}`);

  console.log(currentTask);

  if (isLoading || error) return <h2>Task is loading...</h2>;

  // Fallback für fehlende Daten
  if (!currentTask) {
    return (
      <div>
        No data available
        <p> diese Anzeige darf eig nicht kommen ?</p>
      </div>
    );
  }

  async function handleDelete() {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  async function handleEditTask(updatedTask) {
    const response = await fetch(`/api/tasks/${currentTask._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedData = await response.json();
      console.log("Task updated successfully:", updatedData);
      mutate();
      setIsFormVisible(false);
    } else {
      console.error("Failed to update task");
    }
  }

  async function handleToggleSubtask(subtaskId) {
    const updatedSubtask = currentTask.subTasks.find(
      (subtask) => subtask.id === subtaskId
    );

    if (updatedSubtask) {
      try {
        const response = await fetch(`/api/tasks/${currentTask._id}`, {
          method: "PUT",
          body: JSON.stringify({
            // Markiert, dass es sich um eine Subtask handelt
            isSubtask: true,
            subtaskId,
            // Toggle completed
            completed: !updatedSubtask.completed,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to update subtask: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Subtask updated successfully:", data);
        mutate(); // Aktualisiere die SWR-Daten
      } catch (error) {
        console.error("Error updating subtask:", error);
      }
    }
  }

  async function handleToggleTask(_id) {
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

  // toggle für confirm delete
  function toggleDeleteOption() {
    setIsDeleteOption((prevState) => !prevState);

    if (toggleButtonName === "Delete") {
      setToggleButtonName("Cancel");
    } else {
      setToggleButtonName("Delete");
    }
  }

  function handleCancel() {
    setIsFormVisible(false);
  }

  function toggleFormVisibility() {
    setIsFormVisible((prevState) => !prevState);
  }

  function getTaskVariant(dueDate) {
    if (!dueDate) {
      console.error("Invalid due date provided:", dueDate);
      return "default"; // Fallback variant
    }

    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate)) {
      console.error("Unable to parse due date:", dueDate);
      return "default"; // Fallback variant
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const taskDueDate = parsedDate.toISOString().split("T")[0];

    if (currentDate > taskDueDate) return "overdue";
    if (currentDate === taskDueDate) return "today";
    return "default";
  }

  const taskVariant = getTaskVariant(currentTask.dueDate);

  let prioIconSrc = "";

  const priority = currentTask.priority;
  if (priority === "High") {
    prioIconSrc = "/icons/high.svg";
  } else if (priority === "Medium") {
    prioIconSrc = "/icons/medium.svg";
  } else if (priority === "Low") {
    prioIconSrc = "/icons/low.svg";
  }

  return (
    <>
      <Head>
        <title>Details - Workflow Wizard</title>
      </Head>

      <StyledContentHeading>Task Details</StyledContentHeading>

      <StyledEditBtn onClick={toggleFormVisibility}>
        <EditIcon />
      </StyledEditBtn>

      {isFormVisible && (
        <>
          <TaskForm
            onEditTask={handleEditTask}
            onCancel={handleCancel}
            isFormVisible={isFormVisible}
            isEditMode={true}
            initialData={currentTask}
          />
        </>
      )}
      <BtnBack></BtnBack>

      <SytledDetailsCardWrapper>
        <StyledPlacingMarkButton>
          <BtnMarkAsDone
            isDone={currentTask.isDone}
            toggleDone={handleToggleTask}
            id={currentTask._id}
          />
        </StyledPlacingMarkButton>

        <h3>{currentTask.title}</h3>
        <StyledDescription $variant={currentTask.priority}>
          {currentTask.description}
        </StyledDescription>

        <h4>Subtasks:</h4>
        <StyledSubtaskList>
          {currentTask.subTasks.map((subtask) => (
            <StyledSubtaskLi key={subtask.id} $isChecked={subtask.completed}>
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleToggleSubtask(subtask.id)}
              />
              <span>{subtask.title}</span>
            </StyledSubtaskLi>
          ))}
        </StyledSubtaskList>

        <StyledLabelContainer>
          {currentTask.tasklabel?.map((label) => {
            return <StyledLabelLi key={label}>{label}</StyledLabelLi>;
          })}
        </StyledLabelContainer>

        <StyledBtnWrapper>
          <StyledDivDatePrio>
            <StyledCardDate $variant={taskVariant}>
            <StyledCalenderIcon>
            <CalenderIcon />
          </StyledCalenderIcon>
              {currentTask.dueDate}
            </StyledCardDate>
            <StyledPriority $variant={currentTask.priority}>
              <Image
                src={prioIconSrc}
                alt={"Icon of the Priority"}
                width="25"
                height="25"
              />
            </StyledPriority>
          </StyledDivDatePrio>
          <StyledDelBtnWrapper>
            {/* delete confirm Abfrage */}
            <StyledCardBtn onClick={toggleDeleteOption}>
              {!isDeleteOption ? <StyledTrashIcon><TrashIcon /></StyledTrashIcon> : <StyledTrashIcon><NoTrashIcon /></StyledTrashIcon>}
           
            </StyledCardBtn>
            {isDeleteOption && (
              <StyledCardBtn onClick={() => handleDelete()}>
                <StyledTrashIcon>
                  <TrashIcon />
                </StyledTrashIcon>

              </StyledCardBtn>
            )}
          </StyledDelBtnWrapper>
        </StyledBtnWrapper>
      </SytledDetailsCardWrapper>
    </>
  );
}

// ----- Styled Components -----

const StyledEditBtn = styled.button`
  position: fixed;
  top: 90px;
  right: 25px;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  width: 48px;
  padding: var(--border-radius-btn);
  fill: var(--accent-color);

  border-radius: 50%;
  border: 1px solid var(--accent-color);

  background-color: var(--bg-color-btn);
`;

const SytledDetailsCardWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--bg-color-card);

  border: var(--border-btn);
  border-radius: var(--border-radius-form);

  padding: 35px 20px 20px 20px;
`;

const StyledPlacingMarkButton = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
`;

const StyledDescription = styled.p`
  margin: 20px 10px 30px 10px;
  padding-top: 20px;

  width: 100%;

  text-align: center;

  border-top: ${({ $variant }) =>
    $variant === "High"
      ? "3px solid var(--bg-High)"
      : $variant === "Medium"
      ? "3px solid var(--bg-Medium)"
      : $variant === "Low"
      ? "3px solid var(--bg-Low)"
      : null};
`;

const StyledSubtaskList = styled.ul`
  margin-bottom: 20px;
`;

const StyledSubtaskLi = styled.li`
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
  background-color: var(--bg-color-btn);
  padding: 5px 10px;
  margin: 5px;
  min-width: 60vw;
`;

const StyledLabelContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLabelLi = styled.li`
  list-style: none;
  border-radius: 50px;
  padding: 2.5px 5px;
  border: var(--border-btn);
  background-color: var(--bg-color-btn);
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  /* drückt auch automatisch die Card Größe nach außen */
  width: 80vw;
`;

const StyledDivDatePrio = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledCalenderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;

  fill: var(--text-color);
`;

const StyledDelBtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledCardBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: var(--border-btn);
  border-radius: var(--border-radius-btn);
  background-color: var(--bg-color-btn);

  height: 48px;
  width: 48px;
`;

const StyledTrashIcon = styled.div`
  height: 48px;
  width: 48px;
  padding: var(--padding-icons);

  fill: var(--text-color);
`;

const StyledPriority = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;

  border: var(--border-btn);
  border-radius: var(--border-radius-btn);

  background-color: ${({ $variant }) =>
    $variant === "High"
      ? "var(--bg-High)"
      : $variant === "Medium"
      ? "var(--bg-Medium)"
      : $variant === "Low"
      ? "var(--bg-Low)"
      : null};
`;