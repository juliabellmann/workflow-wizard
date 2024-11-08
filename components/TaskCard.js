import Link from "next/link";
import styled, {css} from "styled-components";

// ----- Styled Components -----

const StyledTaskCard = styled.div`

    background-color: rgba(219, 219, 219, 0.75);

    border: 1px solid gray;
    border-radius: 10px;
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
            min-width: 100px;
            text-align: center;
            padding: 5px;

            border: 1px solid black;
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
    `}
`;

export default function TaskCard({ task }) {
    return (
        <>
            <StyledTaskCard>
                <h3>{task.title}</h3>
                <hr></hr>
                <div>
                    <span>{task.dueDate}</span>
                    <span className={`${task.priority}`}>{task.priority}</span>
                    <span><Link href={`task/${task.id}`}>Details</Link></span>
                </div>
            </StyledTaskCard>
        </>
    );
}