// UpdateForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const SelectField = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
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
    <StyledForm onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <InputField
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <SelectField name="priority" value={formData.priority} onChange={handleChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </SelectField>
      <ButtonContainer>
        <button type="submit">Update Task</button>
        <button type="button" onClick={() => window.history.back()}>Cancel</button>
      </ButtonContainer>
    </StyledForm>
  );
}

