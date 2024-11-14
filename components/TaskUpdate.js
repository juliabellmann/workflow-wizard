import React, { useState } from 'react';
import {StyledUpdateForm, ButtonContainer } from "../styles";
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 5px;
`;

// TODO: Formulare zusammen legen -> value etc in TaskForm
export default function UpdateForm({ initialData, onSubmit }) {

  // Initialisiert den Zustand des Formulars mit den Daten aus initialData und stellt eine Fkt zur Aktualisierung dieser Daten bereit
  const [formData, setFormData] = useState(initialData);

  // dieser Handler aktualisiert den Zustand bei jeder Änderung eines Formularelements.
  function handleChange(e) {
    const { name, value } = e.target;
    //es wird dank des Spread-operator eine neue kopie des gesamten formData-Objekts und überschreibt nur den Wert des geänderten Feldes
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledUpdateForm onSubmit={handleSubmit}>

      <label htmlFor="title"><h3>Task Name: *</h3></label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <label htmlFor="description"><h3>Description:</h3></label>
      <textarea
        rows="3"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>

      <label htmlFor="priority"><h3>Priority: *</h3></label>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label htmlFor="dueDate"><h3>Due Date: *</h3></label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <ButtonContainer>
        <StyledButton type="submit">Update Task</StyledButton>
        <StyledButton type="button" onClick={() => window.history.back()}>Cancel</StyledButton>
      </ButtonContainer>
    </StyledUpdateForm>
  );
}

