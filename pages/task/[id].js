import BtnBack from "@/components/BtnBack";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Head from "next/head";
import TaskForm from "@/components/TaskForm";
import { StyledCardDate, StyledContentHeading } from "@/styles";

export default function TaskDetails({
  tasks,
  onEditTask,
  onDeleteTask,
  onCreateTask,
  toggleDone,
}) {
  // const [isUpdating, setIsUpdating] = useState(false);

  const [isDeleteOption, setIsDeleteOption] = useState(false);
  const [toggleButtonName, setToggleButtonName] = useState("Delete");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  // Warten, bis der Router bereit ist
  if (!router.isReady) return <div>Loading ...</div>;

  // finde die Tasks
  const currentTask = tasks?.find((item) => item.id === id) || null;

  // Fallback für fehlende Daten
  if (!currentTask) {
    return (
      <div>
        No data available
        <p> diese Anzeige darf eig nicht kommen ?</p>
      </div>
    );
  }

  function handleToggleSubtask(subtaskId) {
    const updatedSubtasks = currentTask.subTasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    const updatedTask = { ...currentTask, subTasks: updatedSubtasks };
    onEditTask(currentTask.id, updatedTask);
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

  // delete und rückführung zur Übersicht
  function handleDelete() {
    onDeleteTask(currentTask.id);
    // TODO: Rückführung funktioniert nicht
    // Nach dem Löschvorgang wird zur Startseite zurückgeführt
    router.push("/");
  }

  function handleCancel() {
    setIsFormVisible(false);
  }

  function toggleFormVisibility() {
    setIsFormVisible((prevState) => !prevState);
  }

  function getTaskVariant(dueDate) {
    const currentDate = new Date().toISOString().split("T")[0];
    const taskDueDate = new Date(dueDate).toISOString().split("T")[0];

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
        <Image
          src={"/icons/pencil-solid.svg"}
          alt="Icon Pencil for Edit"
          width="30"
          height="30"
        />
      </StyledEditBtn>

      {isFormVisible && (
        <>
          <TaskForm
            onCreateTask={onCreateTask}
            onEditTask={onEditTask}
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
            toggleDone={toggleDone}
            id={currentTask.id}
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
              <Image
                src={"/icons/calendar-regular.svg"}
                width="20"
                height="20"
                alt="Icon Details"
              />
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
              <Image
                src={
                  !isDeleteOption
                    ? "/icons/trash-can-regular.svg"
                    : "/icons/rectangle-xmark-regular.svg"
                }
                alt={!isDeleteOption ? "Icon Delete" : "Icon Close"}
                width="35"
                height="35"
              />
            </StyledCardBtn>
            {isDeleteOption && (
              <StyledCardBtn onClick={() => handleDelete()}>
                <Image
                  src={"/icons/trash-can-regular.svg"}
                  width="35"
                  height="35"
                  alt="Icon trash can"
                />
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

  border: 1px solid black;
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
  border: 1px solid var(--accent-color);
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

const StyledPriority = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;

  border: 1px solid black;
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

const StyledToggebuttonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
