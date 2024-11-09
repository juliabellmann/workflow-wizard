import { useState } from "react";

// Definieren der Optionen für priority
const priorityOptions = [
    { id: "default", value: "", label: "Please select a priority" },
    { id: "priority1", value: "High", label: "High" },
    { id: "priority2", value: "Medium", label: "Medium" },
    { id: "priority3", value: "Low", label: "Low" },
  ];

export default function TaskForm({ onSubmit }) {

    // Initialisieren des Due Date mit aktuellem Datum
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);

    // Initialisieren des Priority States
    const [selectedPriority, setSelectedPriority] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        // Sammelt alle Formulardaten in einem Objekt
        const formData = new FormData(event.target);
        const taskData = Object.fromEntries(formData);
       
        onSubmit(taskData);
        // Formular Reset nach Klick
        event.target.reset();

    }

    return (
        <>
        <form onSubmit={handleSubmit}>

            <label htmlFor="title"><h3>Task Name: *</h3></label>
            <input type="text" id="title" name="title" placeholder="Please enter a task name here" required />

            <label htmlFor="description"><h3>Description:</h3></label>
            <input type="text" id="description" name="description" placeholder="Optional: enter a task description here" />

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
            <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

            <button type="submit">Create Task</button>
        </form>
        </>
    );
}