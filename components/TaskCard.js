import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, {css} from "styled-components";

// ----- Styled Components -----

const StyledTaskCard = styled.div`

    border: 1px solid gray;
    border-radius: var(--border-radius-button);
    width: 335px;
    padding: 15px;
    margin-bottom: 20px;

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
            background-color: white;
            text-align: center;
            padding: 5px;

            border: 1px solid black;
            border-radius: var(--border-radius-button);
        }
      
        .High {
            background-color: rgba(255, 0, 0, 0.75);
            width: 70px;
        }
        
        .Medium {
            background-color: rgba(255, 196, 0, 0.75);
            width: 70px;
        }
        
        .Low {
            background-color: rgba(21, 255, 0, 0.75);
            width: 70px;
        }

        button {
            background-color: white;
            border: 1px solid black;
            border-radius: var(--border-radius-button);
        }

        svg {
            height: 20px;
        }
    `}
`;

export default function TaskCard({ task, onDeleteTask }) {
    const [isDeleteOption, setIsDeleteOption] = useState(false);
    const [toggleButtonName, setToggleButtonName] = useState("Delete");
    const router = useRouter();

    // SVG s

    const MagnifyingGlassIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        );
      };
    const Trashcan = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
        );
      };

    function getVariant(task) {
        const currentDate = new Date();
        const taskDueDate = new Date(task.dueDate);
        
    // Remove time information from both dates
    currentDate.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

    if (currentDate > taskDueDate) {
        return 'overdue';
      } else if (currentDate.toDateString() === taskDueDate.toDateString()) {
        return 'today';
      } else {
        return 'default';
      }
    }

    console.log(task);

    // toggle für confirm delete
    function toggleDeleteOption() {
        setIsDeleteOption((prevState) => !prevState);
        setToggleButtonName(toggleButtonName === "Delete" ? "Cancel"  : "Delete");
    };

    // delete und rückführung zur Übersicht
    function handleDelete() {
        setIsDeleting(true);
        onDeleteTask(currentTask.id);
    };

    return (
        <>
            {/* <StyledTaskCard $variant={task.isDueDate ? "today" : task.isOverdue ? "overdue" : "default"}> */}
            {/* $variant={task.variant} */}
            {/* <StyledTaskCard className={getBackgroundColor()}> */}
            <StyledTaskCard className={getVariant(task)}>
                <h3>{task.title}</h3>
                <hr></hr>
                <div>
                    <span>{task.dueDate}</span>
                    <span className={`${task.priority}`}>{task.priority}</span>
                    <span><Link href={`task/${task.id}`}><MagnifyingGlassIcon /></Link></span>
                                    {/* delete confirm Abfrage */}
                {isDeleteOption && (
                    <button onClick={() => onDeleteTask(task.id)}><Trashcan/></button>
                )}
                    <button onClick={toggleDeleteOption}>{toggleButtonName}</button>
                </div>
            </StyledTaskCard>
        </>
    );
}