import React, { useState } from "react";
import styled from "styled-components";

// Definieren der Optionen für priority
const priorityOptions = [
    { id: "default", value: "", label: "Please select a priority" },
    { id: "priority1", value: "High", label: "High" },
    { id: "priority2", value: "Medium", label: "Medium" },
    { id: "priority3", value: "Low", label: "Low" },
  ];

export default function TaskForm({ 
    onCreateTask,
    onEditTask, 
    isEditMode = false,
    initialData = {}, 
    onCancel
}) {
    // Initialisieren des Due Date mit aktuellem Datum
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);

    // Initialisieren des Priority States
    // const [selectedPriority, setSelectedPriority] = useState(initialData.priority || "");

    function handleSubmit(event) {
        event.preventDefault();

        // Sammelt alle Formulardaten in einem Objekt
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
       
        console.log("data", data);
        if(isEditMode) {
            onEditTask(data);
            onCancel();
        } else {
            onCreateTask({ ...initialData, ...data });
        }

        // Formular Reset nach Klick
        event.target.reset();
    }
  
    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <h3>Task Name: *</h3>
                </label>
                <StyledInput
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Please enter a task name here"
                    defaultValue={initialData?.title || ""}
                    required
                />

                <label htmlFor="description">
                    <h3>Description:</h3>
                </label>
                <StyledTextarea
                    rows="3"
                    id="description"
                    name="description"
                    placeholder="Optional: enter a task description here"
                    defaultValue={initialData?.description || ""}
                />

                <label htmlFor="priority">
                    <h3>Priority: *</h3>
                </label>
                <StyledSelect
                    id="priority"
                    name="priority"
                    defaultValue={initialData.priority}
                    required
                >
                    {priorityOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </StyledSelect>

                <label htmlFor="dueDate">
                    <h3>Due Date: *</h3>
                </label>
                <StyledInput
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    defaultValue={initialData.dueDate || dueDate}
                />
                <StyledFormBtnContainer>
                    <StyledFormBtn
                    type="submit"
                    $variant={isEditMode ? "update" : "create"}
                    $isEditMode={isEditMode}
                    >
                    {isEditMode ? "Save" : "Create"}
                    </StyledFormBtn>
                    {isEditMode ? (
                    <StyledFormBtn type="button" onClick={onCancel}>
                        Cancel
                    </StyledFormBtn>
                    ) : null}
                </StyledFormBtnContainer>
            </StyledForm>
      </>
    );
}

// ----- Styled Components -----

const StyledForm = styled.form`
    background-color: var(--bg-color-card);
    border: 1px solid black;
    border-radius: var(--border-radius-form);
    display: flex;
    flex-direction: column;

    padding: 0 25px;
    margin-top: 20px;
    width: 90vw;
`;

const StyledInput = styled.input`
    padding: 5px;
    border: 1px solid black;
    border-radius: var(--border-radius-input);
    font-family: var(--text-font-form);
`;

const StyledTextarea = styled.textarea`
    padding: 5px;
    border: 1px solid black;
    border-radius: var(--border-radius-input);
    font-family: var(--text-font-form);
`;

const StyledSelect = styled.select`
    padding: 5px;
    border: 1px solid black;
    border-radius: var(--border-radius-input);
    font-family: var(--text-font-form);
`;

const StyledFormBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 20px 0; 
`;

const StyledFormBtn = styled.button`
    padding: var(--padding-btn);
    border: var(--border-btn);
    border-radius: var(--border-radius-btn);
    background-color: var(--bg-color-btn);
`;

