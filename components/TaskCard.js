import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Image from "next/image";
import { StyledCardDate } from "@/styles";
import SubtasksIcon from "@/assets/icons/list-solid.svg";

export default function TaskCard({ task, onDeleteTask, toggleDone }) {
  const [isDeleteOption, setIsDeleteOption] = useState(false);
  const [toggleButtonName, setToggleButtonName] = useState("Delete");
  // Initialisieren des Priority States
  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    setSelectedPriority(task.priority || "");
  }, [task]);

  function getTaskVariant(dueDate) {
    const currentDate = new Date().toISOString().split("T")[0];
    const taskDueDate = new Date(dueDate).toISOString().split("T")[0];

    if (currentDate > taskDueDate) return "overdue";
    if (currentDate === taskDueDate) return "today";
    return "default";
  }

  const taskVariant = getTaskVariant(task.dueDate);

  // toggle für confirm delete
  function toggleDeleteOption() {
    setIsDeleteOption((prevState) => !prevState);

    if (toggleButtonName === "Delete") {
      setToggleButtonName("Cancel");
    } else {
      setToggleButtonName("Delete");
    }
  }

  let prioIconSrc = "";

  const priority = task.priority;
  if (priority === "High") {
    prioIconSrc = "/icons/high.svg";
  } else if (priority === "Medium") {
    prioIconSrc = "/icons/medium.svg";
  } else if (priority === "Low") {
    prioIconSrc = "/icons/low.svg";
  }

  return (
    <StyledTaskCard $isDone={task.isDone}>
      <StyledUpperContentWrapper>
        <StyledPriority $variant={task.priority}>
          {/* {task.priority} */}
          <Image
            src={prioIconSrc}
            alt={"Icon of the Priority"}
            width="25"
            height="25"
          />
        </StyledPriority>
        <h3>{task.title}</h3>
      </StyledUpperContentWrapper>

      <BtnMarkAsDone isDone={task.isDone} toggleDone={toggleDone} />
      <StyledContentWrapper $variant={task.priority}>
        <StyledCardDate $variant={taskVariant}>
          <Image
            src={"/icons/calendar-regular.svg"}
            width="20"
            height="20"
            alt="Icon Details"
          />
          {task.dueDate}
        </StyledCardDate>

        <StyledSubtasksIconContainer>
          <StyledSubtasksIcon>
            <SubtasksIcon />
          </StyledSubtasksIcon>
          <p>{task.subtasks?.length || 0}</p>
        </StyledSubtasksIconContainer>

        <StyledBtnWrapper>
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

          <StyledCardInfo>
            <Link href={`task/${task.id}`}>
              <Image
                src={"/icons/info-solid.svg"}
                width="35"
                height="35"
                alt="Icon Details"
              />
            </Link>
          </StyledCardInfo>
        </StyledBtnWrapper>
      </StyledContentWrapper>
    </StyledTaskCard>
  );
}

// ----- Styled Components -----

const StyledTaskCard = styled.div`
  position: relative;

  border: 1px solid black;
  border-radius: var(--border-radius-btn);

  width: 335px;
  padding: 15px;
  margin-bottom: 20px;

  /* Hintergrundfarbe für die Visualisierung des Datums */
  ${(props) =>
    props.$isDone
      ? `background-color: lightgrey; color: grey; text-decoration:line-through; `
      : ``}
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-top: 3px solid red;
  padding-top: 10px;

  border-top: ${({ $variant }) =>
    $variant === "High"
      ? "3px solid var(--bg-High)"
      : $variant === "Medium"
      ? "3px solid var(--bg-Medium)"
      : $variant === "Low"
      ? "3px solid var(--bg-Low)"
      : null};
`;

const StyledDelBtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledSubtasksIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 5px;
`;

const StyledSubtasksIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 15px;
    width: 15px;
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

const StyledCardInfo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 48px;

  border: 1px solid black;
  border-radius: var(--border-radius-btn);

  background-color: var(--bg-color-btn);
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

const StyledUpperContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
