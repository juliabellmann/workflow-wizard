import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Image from "next/image";
import { StyledCardDate } from "@/styles";
import SubtasksIcon from "@/assets/icons/list-solid.svg";
import CalenderIcon from "@/assets/icons/calendar-regular.svg";
import TrashIcon from "@/assets/icons/trash-can-regular.svg";
import NoTrashIcon from "@/assets/icons/rectangle-xmark-regular.svg";
import DetailsIcon from "@/assets/icons/info-solid.svg";
import ProgressIcon from "@/assets/icons/chart-line-solid.svg";

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

  const calculatePercentage = (completed, total) => {
    const percentage = Math.min(100, Math.max(0, (completed / total) * 100));
    return `${percentage.toFixed(0)}%`;
  };

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
        <StyledTaskName>{task.title}</StyledTaskName>
      </StyledUpperContentWrapper>

      <BtnMarkAsDone isDone={task.isDone} toggleDone={() => toggleDone(task)} />

      {/* Progress Bar */}
      <StyledProgressbarWrapper>
      <StyledProgressIcon>
        <ProgressIcon />
      </StyledProgressIcon>
      <StyledProgressbar
        value={
          task.subTasks?.filter((subtask) => subtask.completed)?.length || 0
        }
        min="0"
        max={task.subTasks?.length || 0}
        >{`${
          task.subTasks?.filter((subtask) => subtask.completed)?.length || 0
        } / ${task.subTasks?.length || 0}`}</StyledProgressbar>
          {`${calculatePercentage(
            task.subTasks?.filter((subtask) => subtask.completed)?.length || 0,
            task.subTasks?.length || 0
          )}`}
        </StyledProgressbarWrapper>

      {/* Trennbalken */}
      <StyledLine $variant={task.priority}></StyledLine>

      {/* Label */}
      <StyledLabelContainer>
        {task.tasklabel?.map((label) => {
          return <StyledLabelLi key={label}>{label}</StyledLabelLi>;
        })}
      </StyledLabelContainer>

      <StyledContentWrapper>
        <StyledCardDate $variant={taskVariant}>
          <StyledCalenderIcon>
            <CalenderIcon />
          </StyledCalenderIcon>
          {task.dueDate}
        </StyledCardDate>

        <StyledSubtasksIconContainer>
          <StyledSubtasksIcon>
            <SubtasksIcon />
          </StyledSubtasksIcon>
          <p>{task.subTasks?.length || 0}</p>
        </StyledSubtasksIconContainer>

        <StyledBtnWrapper>
          <StyledDelBtnWrapper>
            {/* delete confirm Abfrage */}
            <StyledCardBtn onClick={toggleDeleteOption}>
              {!isDeleteOption ? <StyledTrashIcon><TrashIcon /></StyledTrashIcon> : <StyledTrashIcon><NoTrashIcon /></StyledTrashIcon>}
            </StyledCardBtn>
            {isDeleteOption && (
              <StyledCardBtn onClick={() => onDeleteTask(task.id)}>
                <StyledTrashIcon>
                  <TrashIcon />
                </StyledTrashIcon>
              </StyledCardBtn>
            )}
          </StyledDelBtnWrapper>

          <StyledCardInfo>

            <Link href={`task/${task._id}`}>
              <StyledTrashIcon>
                <DetailsIcon />
              </StyledTrashIcon>
            </Link>
          </StyledCardInfo>
        </StyledBtnWrapper>
      </StyledContentWrapper>
    </StyledTaskCard>
  );
}

// ----- Styled Components -----

const StyledProgressbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 5px 0;
`;

const StyledProgressIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 15px;
  height: 15px;
`;

const StyledTaskCard = styled.div`
  position: relative;

  border: var(--border-btn);
  border-radius: var(--border-radius-btn);

  width: 335px;
  padding: 5px 10px;
  margin-bottom: 10px;

  /* Hintergrundfarbe für die Visualisierung des Datums */
  ${(props) =>
    props.$isDone
      ? `background-color: lightgrey; color: grey; text-decoration:line-through; `
      : `background-color: var(--bg-color-card);`}
`;

const StyledProgressbar = styled.progress`
  width: 100%;
  height: 10px;
  border: none;
  margin: 0 10px;
  
  &::-webkit-progress-bar{
    background-color: lightgray;
    color: red;
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: var(--accent-color);
    border-radius: 10px;
  }
`;

const StyledLine = styled.div`
  padding-top: 10px;

  border-top: ${({ $variant }) =>
    $variant === "High"
      ? "5px solid var(--bg-High)"
      : $variant === "Medium"
      ? "5px solid var(--bg-Medium)"
      : $variant === "Low"
      ? "5px solid var(--bg-Low)"
      : null};
`;

const StyledLabelContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLabelLi = styled.li`
  border-radius: 50px;
  padding: 2.5px 5px;
  border: var(--border-btn);
  background-color: var(--bg-color-btn);
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledDelBtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledSubtasksIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;

  fill: var(--text-color);
`;

const StyledCalenderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  width: 15px;

  fill: var(--text-color);
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

  height: 35px;
  width: 35px;

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

const StyledTaskName = styled.h3`
  display: flex;
  justify-content: center;
  margin: 5px 0 5px 0;
`;

const StyledCardInfo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 48px;

  border: var(--border-btn);
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

const StyledTrashIcon = styled.div`
  height: 48px;
  width: 48px;
  padding: var(--padding-icons);

  fill: var(--text-color);
`;

const StyledUpperContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
