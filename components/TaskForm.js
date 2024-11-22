import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  onCancel,
}) {
  // Initialisieren des Due Date mit aktuellem Datum
  const [subtasks, setSubtasks] = useState(initialData.subtasks || []);

  //  We don't need a state for the due date._JL
  const dueDate = new Date().toISOString().split("T")[0];

  // Function to add a new subtask_JL
  function handleAddSubtask() {
    setSubtasks([...subtasks, { id: uuidv4(), title: "", completed: false }]);
  }

  // Function to update the title of a subtask with the given id_JL
  function handleSubtaskChange(id, newValue) {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, title: newValue } : subtask
      )
    );
  }

  // Use the id for operations like deletion instead of relying on the index_JL
  function handleDeleteSubtask(id) {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate that subtasks have non-empty titles before submission._JL
    const validSubtasks = subtasks.filter(
      (subtask) => subtask.title.trim() !== ""
    );

    // Sammelt alle Formulardaten in einem Objekt
    const formData = new FormData(event.target);
    // Include subtasks directly_JL
    const data = {
      ...Object.fromEntries(formData),
      subtasks: validSubtasks,
    };

    console.log("data", data);
    if (isEditMode) {
      onEditTask(data);
      onCancel();
    } else {
      onCreateTask(data);
    }

    // Formular Reset nach Klick
    event.target.reset();
    // Reset subtasks_JL
    setSubtasks([]);
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
        <label htmlFor="subtask">
          <h3>Subtask:</h3>
        </label>
        <StyledFormBtn type="button" onClick={handleAddSubtask}>
          + Add Subtask
        </StyledFormBtn>
        {subtasks.map((subtask, index) => (
          <StyledSubtaskList key={index}>
            <label htmlFor={`subtask_${index}`}>
              <h4>{index + 1}: </h4>
            </label>
            <StyledInput
              key={`${index}_input`}
              type="text"
              name={`subtask_${index}`}
              placeholder={`Subtask ${index + 1} title`}
              value={subtask.title}
              onChange={(event) =>
                handleSubtaskChange(subtask.id, event.target.value)
              }
            />
            <button onClick={() => handleDeleteSubtask(subtask.id)}>X</button>
          </StyledSubtaskList>
        ))}

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

const StyledSubtaskList = styled.div`
  display: flex;
  margin: 5px;
`;
