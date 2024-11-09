// UpdateForm.js
import React, { useState } from 'react';
import styled, {css} from "styled-components";

// ----- Styled Components -----

const StyledUpdateForm = styled.form`
  background-color: rgba(219, 219, 219, 0.75);
    border: 1px solid black;
    display: flex;
    flex-direction: column;

    padding: 25px;
    margin-top: 20px;

  ${css`
      button {
          background-color: white;
          padding: 5px;
          white-space: nowrap;

          border-radius: 10px;

          border: 1px solid black;

      }
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default function UpdateForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
        rows="5"
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
        <button type="submit">Update Task</button>
        <button type="button" onClick={() => window.history.back()}>Cancel</button>
      </ButtonContainer>
    </StyledUpdateForm>
  );
}

