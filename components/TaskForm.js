import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// Definieren der Optionen für priority
const priorityOptions = [
  { id: "default", value: "", label: "Please select a priority" },
  { id: "priority1", value: "High", label: "High" },
  { id: "priority2", value: "Medium", label: "Medium" },
  { id: "priority3", value: "Low", label: "Low" },
];

const tasklabels = [
  { id: "tasklabel1", value: "Homework", label: "Homework" },
  { id: "tasklabel2", value: "Groceries", label: "Groceries" },
  { id: "tasklabel3", value: "Sport", label: "Sport" },
  { id: "tasklabel4", value: "Work", label: "Work" },
  { id: "tasklabel5", value: "Me-Time", label: "Me-Time" },
  { id: "tasklabel6", value: "Health", label: "Health" },
  { id: "tasklabel7", value: "Travel", label: "Travel" },
];

export default function TaskForm({
  onCreateTask,
  onEditTask,
  isEditMode = false,
  initialData = {},
  onCancel,
}) {
  // Initialisieren des Due Date mit aktuellem Datum
  const [subtasks, setSubtasks] = useState(initialData.subTasks || []);

  const [selectedLabels, setSelectedLabels] = useState(
    initialData.tasklabel ? [...initialData.tasklabel] : []
  );

  useEffect(() => {
    // Initialisierung von selectedLabels nach dem ersten Render
    if (!selectedLabels.length) {
      setSelectedLabels([]);
    }
  }, []);

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

  function handleLabelChange(event) {
    const checked = event.target.checked;
    const value = event.target.value;

    setSelectedLabels((prevLabels) =>
      checked
        ? [...prevLabels, value]
        : prevLabels.filter((label) => label !== value)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate that subtasks have non-empty titles before submission._JL
    const validSubtasks = subtasks.filter(
      (subtask) => subtask.title.trim() !== ""
    );

    // Sammelt alle Formulardaten in einem Objekt
    const formData = new FormData(event.target);

    const selectedLabels = formData.getAll("tasklabel");

    // Include subtasks directly_JL
    const data = {
      ...Object.fromEntries(formData),
      subTasks: validSubtasks,
      tasklabel: selectedLabels,
    };

    data.tasklabel = selectedLabels;

    if (isEditMode) {
      onEditTask(data);
      onCancel();
    } else {
      onCreateTask({ ...data, isDone: false });
    }

    // Formular Reset nach Klick
    event.target.reset();
    // Reset subtasks_JL
    setSubtasks([]);
    setSelectedLabels([]);
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

        {/* Label */}
        <label htmlFor="tasklabel">
          <h3>Task Label:</h3>
        </label>
        <section>
          {tasklabels.map((option) => (
            <div key={option.id}>
              <StyledInput
                type="checkbox"
                id={option.id}
                name="tasklabel"
                value={option.value}
                checked={selectedLabels.includes(option.value)}
                onChange={handleLabelChange}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </section>

        <label htmlFor="subtask">
          <h3>Subtask:</h3>
        </label>
        <StyledFormAddBtn type="button" onClick={handleAddSubtask}>
          + Add Subtask
        </StyledFormAddBtn>
        {subtasks.map((subtask, index) => (
          <StyledSubtaskList key={index}>
            <label htmlFor={`subtask_${index}`}>
              <h4>{index + 1}: </h4>
            </label>
            <StyledInput
              id={`subtask_${index}`}
              type="text"
              placeholder={`Subtask ${index + 1} title`}
              value={subtask.title}
              onChange={(event) =>
                handleSubtaskChange(subtask.id, event.target.value)
              }
            />
            <StyledCloseBtn onClick={() => handleDeleteSubtask(subtask.id)}>
              {" "}
              X{" "}
            </StyledCloseBtn>
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
  border: var(--border-btn);
  border-radius: var(--border-radius-form);
  display: flex;
  flex-direction: column;

  padding: 0 25px;
  margin-top: 20px;
  width: 90vw;
`;

const StyledInput = styled.input`
  padding: 5px;
  border: var(--border-btn);
  border-radius: var(--border-radius-input);
  font-family: var(--text-font-form);
`;

const StyledTextarea = styled.textarea`
  padding: 5px;
  border: var(--border-btn);
  border-radius: var(--border-radius-input);
  font-family: var(--text-font-form);
`;

const StyledSelect = styled.select`
  padding: 5px;
  border: var(--border-btn);
  border-radius: var(--border-radius-input);
  font-family: var(--text-font-form);
`;

const StyledCloseBtn = styled.button`
  border: var(--border-btn);
  border-radius: var(--border-radius-btn);
  background-color: var(--bg-color-btn);
  padding: 5px;
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
  color: var(--text-color);
`;

const StyledFormAddBtn = styled.button`
  padding: 10px 15px;
  border: var(--border-btn);
  border-radius: var(--border-radius-btn);
  background-color: var(--bg-color-btn);
  color: var(--text-color);
  margin: 10px 20px;
`;

const StyledSubtaskList = styled.div`
  display: flex;
  margin: 5px;
  gap: 15px;
`;
