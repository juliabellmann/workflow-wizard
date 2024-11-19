import BtnBack from "@/components/BtnBack";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import BtnMarkAsDone from "@/components/BtnMarkAsDone";
import Head from "next/head";
import TaskForm from "@/components/TaskForm";

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

    width: 300px;

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
const StyledFlexbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

const StyledPlacingMarkButton = styled.div`
        position: absolute;
        top: 140px;
        right: 30px;
`;

export default function TaskDetails({ tasks, onEditTask, onDeleteTask, onCreateTask,  toggleDone }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteOption, setIsDeleteOption] = useState(false);
    const [toggleButtonName, setToggleButtonName] = useState("Delete");
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    function handleEdit(updatedTask) {
        onEditTask(currentTask.id, updatedTask);
    };

    function handleCancel() {
        setIsFormVisible(false);
    };

    function toggleFormVisibility() {
        setIsFormVisible((prevState) => !prevState);
      }
    return (
        <>
            <Head>
                <title>Details - Workflow Wizard</title>
            </Head>

            <StyledContentHeading>Task Details</StyledContentHeading>

            <button onClick={toggleFormVisibility}>
                <Image
                    src={"/icons/pencil-solid.svg"}
                    alt="Icon Pencil for Edit"
                    width="20"
                    height="20"
                    unoptimized
                />
            </button>

            {isFormVisible && <>
                <TaskForm 
                    onCreateTask={onCreateTask} 
                    onEditTask={handleEdit} 
                    onCancel={handleCancel}
                    isFormVisible={isFormVisible}
                    isEditMode={true} 
                    initialData={currentTask}
                />
      </>
      }

            {isUpdating ? (
            <StyledFlexbox>
                <TaskForm 
                onCreateTask={onCreateTask} 
                onEditTask={handleEdit} 
                onCancel={handleCancel}
                isFormVisible={isFormVisible}
                isEditMode={true} 
                initialData={currentTask}
                />
            </StyledFlexbox>

        ) : (
            <StyledFlexbox>
                <SytledDetailsWrapper>
                    <StyledPlacingMarkButton>
                        <BtnMarkAsDone 
                            isDone={currentTask.isDone}
                            toggleDone={toggleDone}
                            id={currentTask.id}
                        />
                    </StyledPlacingMarkButton>
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
                                    width="20"
                                    height="20"
                                    unoptimized
                                />
                            </button>
                            {isDeleteOption && (
                                <button onClick={() => handleDelete(id)}><Image src={"/icons/trash-can-regular.svg"} width="20" height="20" alt="Icon trash can" /></button>
                            )}
                        </StyledToggebuttonWrapper>
                    </StyledDivDatePrio>
                    <BtnBack></BtnBack>
                </SytledDetailsWrapper>
        </StyledFlexbox>
        )}
        </>
    )
}