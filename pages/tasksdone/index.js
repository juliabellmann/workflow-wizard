import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import ButtonBack from "@/components/BtnBack";
import Image from "next/image";
import { StyledContentHeading } from "@/styles";

const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 50px;

  margin: 50px 0;


`;
const StyledParagraph = styled.p`
  text-align: center;
`;

export default function TasksDone({ tasks, toggleDone, onDeleteTask }) {
  const tasksDone = tasks.filter((task) => task.isDone);


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
      <ButtonBack />

      <StyledContentHeading>Done List</StyledContentHeading>
      
      {tasksDone.length === 0 && (
        <StyledFlexbox>

        <StyledParagraph>Unfortunately, you have not yet done any tasks.</StyledParagraph>
        <Image
            src={"/icons/notask.svg"}
            alt={"Icon of empty task"}
            width="50"
            height="50"
            unoptimized
            />
        </StyledFlexbox>
      )}
      {/* FYI: Icon for error message follows after merge */}
      <ul>
        {tasksDone.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard 
                  task={task} 
                  toggleDone={() => toggleDone(task.id)} 
                  onDeleteTask={() => onDeleteTask(task.id)} 
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
