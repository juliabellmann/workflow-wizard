import Link from "next/link"; 
import { useState, useEffect } from "react";
import styled, {css} from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Image from "next/image";

// ----- Styled Components -----

const StyledTaskCard = styled.div`

    border: 1px solid gray;
    border-radius: var(--border-radius-button);
    width: 335px;
    padding: 15px;
    margin-bottom: 20px;
    position: relative;

    /* Hintergrundfarbe für die Visualisierung des Datums */
    background-color: ${({ $variant }) =>
    $variant === "overdue"
      ? "var(--bg-overdue)"
      : $variant === "today"
      ? "var(--bg-today)"
      : "var(--bg-default)"};


    ${css`
        h3 {
            margin-bottom: 0;
        }

        hr {
            margin: 15px 0;
        }

        div {
            display: flex;
            justify-content: space-between;
        }

        span {
            text-align: center;
            padding: 5px;

            border: 1px solid black;
            border-radius: var(--border-radius-button);

            display: flex;
            align-items: center;
            justify-content: center;
        }
      
        button {
            background-color: white;

            display: flex;
            align-items: center;
            justify-content: center;
        }

        svg {
            height: 20px;
        }

        ${props => props.$isDone ? `background-color: lightgrey; color: grey; text-decoration:line-through; ` : ``}
  `};
`;

const StyledToggebuttonWrapper = styled.div`
    width: 75px;
    button {
        border: 1px solid black;
        border-radius: 5px;
    }
`;

const StyledPriority = styled.span`
  background-color: ${({ $variant }) =>
    $variant === "High" ? "var(--bg-High)"
      : $variant === "Medium" ? "var(--bg-Medium)"
      : $variant === "Low" ? "var(--bg-Low)" : null };
`;

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
    };

    console.log("task prio", task.priority);
    return (
        <>

            <StyledTaskCard $variant={taskVariant} $isDone={task.isDone}>

                <h3>{task.title}</h3>
                <hr></hr>
                    <BtnMarkAsDone 
                        isDone={task.isDone}
                        toggleDone={toggleDone}
                        />
                    <div>
                        <span>{task.dueDate}</span>
                        <StyledPriority $variant={task.priority}>{task.priority}</StyledPriority>
                        <span><Link href={`task/${task.id}`}><Image src={"/icons/magnifying-glass.svg"} width="20" height="20" alt="Icon magnifying-glass" /></Link></span>
                        <StyledToggebuttonWrapper>
                            {/* delete confirm Abfrage */}
                            <button onClick={toggleDeleteOption}>
                                <Image
                                    src={!isDeleteOption ? "/icons/trash-can-regular.svg" : "/icons/rectangle-xmark-regular.svg" }
                                    alt={!isDeleteOption ? "Icon Delete" : "Icon Close" }
                                    width="20"
                                    height="20"
                                    unoptimized
                                />
                            </button>
                            {isDeleteOption && (
                                <button onClick={() => onDeleteTask(task.id)}><Image src={"/icons/trash-can-regular.svg"} width="20" height="20" alt="Icon trash can" /></button>
                            )}
                        </StyledToggebuttonWrapper>
                    </div>
            </StyledTaskCard>
        </>
    );
}