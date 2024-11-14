import Link from "next/link"; 
import { useRouter } from "next/router";
import { useState } from "react";
import styled, {css} from "styled-components";
import MarkAsDoneButton from "@/components/MarkAsDoneButton";
import Image from "next/image";

// ----- Styled Components -----

const StyledTaskCard = styled.div`

    background-color: var(--bg-color);

    border: 1px solid gray;
    border-radius: var(--border-radius-button);
    width: 335px;
    padding: 15px;
    margin-bottom: 20px;
    position: relative;

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

            display: flex;
            align-items: center;
            justify-content: center;
        }
      
        .High {
            background-color: var(--bg-high);
            width: 70px;
        }
        
        .Medium {
            background-color: var(--bg-medium);
            width: 70px;
        }
        
        .Low {
            background-color: var(--bg-low);
            width: 70px;
        }

        button {
            background-color: white;
            border: 0 solid black;
            /* border-radius: var(--border-radius-button); */

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
    /* border: 1px solid red; */
    width: 75px;
    button {
        border: 1px solid black;
        border-radius: 5px;
    }
`;

export default function TaskCard({ task, onDeleteTask, onToggleDone}) {
    const [isDeleteOption, setIsDeleteOption] = useState(false);
    const [toggleButtonName, setToggleButtonName] = useState("Delete");
    const router = useRouter();

    // toggle für confirm delete
    function toggleDeleteOption() {
        setIsDeleteOption((prevState) => !prevState);
        setToggleButtonName(!isDeleteOption);
    };

    return (
        <>
            <StyledTaskCard>
                <h3>{task.title}</h3>
                <hr></hr>
                    <MarkAsDoneButton 
                        isDone={task.isDone}
                        onToggleDone={onToggleDone}
                        />
                    <div>
                    <span>{task.dueDate}</span>
                    <span className={`${task.priority}`}>{task.priority}</span>
                    <span><Link href={`task/${task.id}`}><Image src={"/icons/magnifying-glass.svg"} width="20" height="20" alt="Icon magnifying-glass" /></Link></span>
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
                        <button onClick={() => onDeleteTask(task.id)}><Image src={"/icons/trash-can-regular.svg"} width="20" height="20" alt="Icon trash can" /></button>
                    )}

                    </StyledToggebuttonWrapper>
                </div>
            </StyledTaskCard>
        </>
    );
}