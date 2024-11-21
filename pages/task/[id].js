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
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteOption, setIsDeleteOption] = useState(false);
  const [toggleButtonName, setToggleButtonName] = useState("Delete");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskStates, setSubtaskStates] = useState({});

  const router = useRouter();
  const { id } = router.query;

  // Warten, bis der Router bereit ist
  if (!router.isReady) return <div>Loading ...</div>;

  // finde die Tasks
  const currentTask = tasks?.find((item) => item.id === id) || null;

  // Fallback für fehlende Daten
  if (!currentTask) return <div>No data available</div>;

  useEffect(() => {
    if (currentTask && currentTask.subtasks) {
      setSubtasks(currentTask.subtasks);
    }
  }, [currentTask]);

  const isChecked = false;

  const renderSubtasks = () => {
    return subtasks.map((subtask, index) => (
      <li key={index} $ischecked={isChecked}>
        <input 
        type="checkbox"
        // onChange={() => handleToggleSubtask(subtask.isChecked)}
        />
        <span>
        {/* <span > */}
          {index + 1}: {subtask.title}
        </span>
        
        </li>
    ));
  };

  const handleToggleSubtask = (isChecked) => {
    setSubtaskStates(prevState => ({
      ...prevState,
      [isChecked]: !prevState[isChecked]
    }));
  };

  const handleSubtaskChange = (index, newValue) => {
    setSubtasks(subtasks.map((subtask, i) => 
      i === index ? { ...subtask, title: newValue } : subtask
    ));
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: "" }]);
  };

  function handleUpdateClick() {
    setIsUpdating(true);
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
    setIsDeleting(true);
    onDeleteTask(currentTask.id);
    router.replace("/");
  }

  function handleEdit(updatedTask) {
    onEditTask(currentTask.id, updatedTask);
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
            onEditTask={handleEdit}
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
        <div>
          <h4>Subtasks:</h4>
          <ul>{renderSubtasks()}</ul>
        </div>

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
          {/* <button onClick={handleUpdateClick}><Image src={"/icons/pen-to-square-regular.svg"} width="20" height="20" alt="Icon Edit" /></button> */}
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
              <StyledCardBtn onClick={() => onDeleteTask(task.id)}>
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
  top: 50px;
  right: 25px;
  z-index: 10;

  height: 48px;
  width: 48px;

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
