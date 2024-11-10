import ButtonBack from "@/components/ButtonBack";
import UpdateForm from "@/components/TaskUpdate";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled, { css } from "styled-components";

// ----- Styled Components -----

const StyledContentHeading = styled.h2`
  display: flex;
  justify-content: center;
`;

const SytledDetailsWrapper = styled.div`
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid black;
    border-radius: 10px;

    padding: 20px;
    margin-bottom: 20px;

    ${css`
        p {
            min-height: 15vh;
            text-align: left;
            margin: 0 0 20px 0;

            border-top: 1px solid black;
            padding-top: 10px;
        }

        div.date-prio {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        div.edit-delete {
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            button {

                padding: 5px 20px;
                border: 1px solid black;
                border-radius: 10px;
            }
        }

        span {
            padding: 5px 10px;
            background-color: white;

            border-radius: 10px;
        }
        .High {
            background-color: rgba(255, 0, 0, 0.75);
        }
        
        .Medium {
            background-color: rgba(255, 196, 0, 0.75);
        }
        
        .Low {
            background-color: rgba(21, 255, 0, 0.75);
        }

        button {
            background-color: white;
            padding: 5px;

            border-radius: 10px;
        }
    `}
`;

export default function TaskDetails({ tasks, onUpdateTask, onDeleteTask }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const router = useRouter();
    const { id } = router.query;

    // Warten, bis der Router bereit ist
    if(!router.isReady) return <div>Loading ...</div>;

    // finde die Tasks
    const currentTask = tasks?.find(item => item.id === id) || null;

    // Fallback für fehlende Daten
    if (!currentTask) return <div>No data available</div>;


    const handleUpdateClick = () => {
        setIsUpdating(true);
    };

    const handleUpdateSubmit = (updatedTask) => {
        onUpdateTask(updatedTask);
        setIsUpdating(false);
    };

    const handleDeleteConfirm = () => {
        setIsDeleting(true);
        onDeleteTask(currentTask.id);
        router.replace('/');
    };

    return (
        <>
        <StyledContentHeading>Task Details</StyledContentHeading>
        {isUpdating ? (
            <UpdateForm 
              initialData={currentTask} 
              onSubmit={handleUpdateSubmit}
            />
        ) : (
        <SytledDetailsWrapper>
            <h3>{currentTask.title}</h3>
            <p>{currentTask.description}</p>
            <div className="date-prio">
                <span>{currentTask.dueDate}</span>
                <span className={`${currentTask.priority}`}>{currentTask.priority}</span>
            </div>
            <div className="edit-delete">
                <button onClick={handleUpdateClick}>Edit</button>
                <button onClick={handleDeleteConfirm}>Delete this</button>
            </div>
            <ButtonBack></ButtonBack>
        </SytledDetailsWrapper>
        )}
        </>
    )


}