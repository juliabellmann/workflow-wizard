import ButtonBack from "@/components/ButtonBack";
import UpdateForm from "@/components/TaskUpdate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled, { css } from "styled-components";

// ----- Styled Components -----
// TODO: Styles Überarbeiten -> Verschachtelung aufheben

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

        span {
            padding: 5px 10px;
            background-color: white;

            border-radius: 10px;
            border: 1px solid black;
        }

        .High {
            background-color: var(--bg-high);
        }
        
        .Medium {
            background-color: var(--bg-medium);
        }
        
        .Low {
            background-color: var(--bg-low);
        }

        button {
            background-color: white;
            padding: 5px;

            border-radius: 10px;

            display: flex;
            align-items: center;
            justify-content: center;
        }

        svg {
            height: 20px;
        }
    `}
`;

const StyledToggebuttonWrapper = styled.div`
    display: flex;
    flex-direction: row;

    width: 75px;
    button {
        border: 1px solid black;
        border-radius: 5px;
    }
`;

const StyledDivDatePrio = styled.div`
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        button {
            height: 30px;
            padding: 5px 20px;
            border: 1px solid black;
            border-radius: 10px;

            display: flex;
            align-items: center;
            justify-content: center;
        }
`;

export default function TaskDetails({ tasks, onUpdateTask, onDeleteTask }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteOption, setIsDeleteOption] = useState(false);
    const [toggleButtonName, setToggleButtonName] = useState("Delete");

    const router = useRouter();
    const { id } = router.query;

    // Warten, bis der Router bereit ist
    if(!router.isReady) return <div>Loading ...</div>;

    // finde die Tasks
    const currentTask = tasks?.find(item => item.id === id) || null;

    // Fallback für fehlende Daten
    if (!currentTask) return <div>No data available</div>;

    function  handleUpdateClick() {
        setIsUpdating(true);
    };

    function handleUpdateSubmit(updatedTask) {
        onUpdateTask(updatedTask);
        setIsUpdating(false);
    };

    // toggle für confirm delete
    function toggleDeleteOption() {
        setIsDeleteOption((prevState) => !prevState);
    
        if (toggleButtonName === "Delete") {
          setToggleButtonName("Cancel");
        } else {
          setToggleButtonName("Delete");
        }
    };

    // delete und rückführung zur Übersicht
    function handleDelete() {
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
            {/* className mit $variant ersetzen */}
            <StyledDivDatePrio>
                <span>{currentTask.dueDate}</span>
                <span className={`${currentTask.priority}`}>{currentTask.priority}</span>
            </StyledDivDatePrio>
            <StyledDivDatePrio>
                <button onClick={handleUpdateClick}><Image src={"/icons/pen-to-square-regular.svg"} width="20" height="20" alt="Icon Edit" /></button>
                <StyledToggebuttonWrapper>
                    {/* delete confirm Abfrage */}
                    <button onClick={toggleDeleteOption}>
                        <Image
                            src={!isDeleteOption ? "/icons/trash-can-regular.svg" : "/icons/rectangle-xmark-regular.svg" }
                            alt={!isDeleteOption ? "Icon Delete" : "Icon Close" }
                            width={20}
                            height={20}
                            unoptimized
                        />
                    </button>
                    {isDeleteOption && (
                        <button onClick={() => handleDelete(id)}><Image src={"/icons/trash-can-regular.svg"} width="20" height="20" alt="Icon trash can" /></button>
                    )}
                </StyledToggebuttonWrapper>
            </StyledDivDatePrio>
            <ButtonBack></ButtonBack>
        </SytledDetailsWrapper>
        )}
        </>
    )
}