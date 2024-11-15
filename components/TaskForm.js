import React, { useState } from "react";
import styled, {css} from "styled-components";
import { StyledButton } from "./StyledButton";

// ----- Styled Components -----

const StyledDetails = styled.details`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    margin-bottom: 20px;
`;

const StyledFormContainer = styled.form`
    background-color: var(--bg-color);
    border: 1px solid black;
    border-radius: var(--border-radius-button);
    display: flex;
    flex-direction: column;

    width: 300px;
    padding: 25px;
    margin-top: 20px;

    ${css`
        h3 {
            margin: 10px 0;
        }

        input {
            padding: 5px;
            border: 1px solid black;
            border-radius: var(--border-radius-input);
            font-family: var(--text-font);
        }

        textarea {
            padding: 5px;
            border: 1px solid black;
            border-radius: var(--border-radius-input);
            font-family: var(--text-font);
        }

        select {
            padding: 5px;
            border: 1px solid black;
            border-radius: var(--border-radius-input);
            font-family: var(--text-font);
        }

        button {
            background-color: white;
            padding: 5px;
            white-space: nowrap;

            border: 1px solid black;
            border-radius: var(--border-radius-button);

            margin: 20px 40px 0 40px;

            display: flex;
            align-items: center;
            justify-content: center;
        }
  `}
`;

const StyledSummary = styled.summary`
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 10px; 
`;

// Definieren der Optionen für priority
const priorityOptions = [
    { id: "default", value: "", label: "Please select a priority" },
    { id: "priority1", value: "High", label: "High" },
    { id: "priority2", value: "Medium", label: "Medium" },
    { id: "priority3", value: "Low", label: "Low" },
  ];

export default function TaskForm({ onSubmit, onCreateTask, onEditTask, isEditMode = false, formData ={}, onCancel }) {

    // Initialisieren des Due Date mit aktuellem Datum
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);

    // Initialisieren des Priority States
    const [selectedPriority, setSelectedPriority] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        // Sammelt alle Formulardaten in einem Objekt
        const formData = new FormData(event.target);
        const taskData = Object.fromEntries(formData);
       
    if (onSubmit) {
      onSubmit(taskData);
    }

        // Änderung der Funktion je nach Edit oder Create Mode
        // if(isEditMode) {
        //     onEditTask({ ...formData, ...taskData });
        //     onCancel();
        //   } else {
        //     onCreateTask({ ...formData, ...taskData });
        //   }

        // Formular Reset nach Klick
        event.target.reset();
    }

    return (
        <>
            <StyledDetails>
                <StyledSummary>Create New Task</StyledSummary>
                    <StyledFormContainer onSubmit={handleSubmit}>

                        <label htmlFor="title"><h3>Task Name: *</h3></label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Please enter a task name here" 
                            defaultValue={formData?.title || ""}
                            required 
                        />

                        <label htmlFor="description"><h3>Description:</h3></label>
                        <textarea 
                            rows="3" 
                            id="description" 
                            name="description" 
                            placeholder="Optional: enter a task description here" 
                            defaultValue={formData?.description || ""}
                        />

                        <label htmlFor="priority"><h3>Priority: *</h3></label>
                        <select
                            id="priority"
                            name="priority"
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            required
                            >
                            {priorityOptions.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="dueDate"><h3>Due Date: *</h3></label>
                        {/* onChange: Aktualisiert den Zustand "dueDate", wenn der Nutzer ein neues Datum wählt */}
                        <input 
                            type="date" 
                            id="dueDate" 
                            name="dueDate" 
                            value={dueDate} 
                            defaultValue={formData.dueDate}
                            onChange={(e) => setDueDate(e.target.value)} 
                        />
                        <button type="submit">Create Task</button>
                    </StyledFormContainer>
            </StyledDetails>
        </>
    );
}