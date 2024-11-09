import { useState } from "react";

// Definieren der optionen für priority
const priorityOptions = [
    { id: "priority1", value: "High", label: "High" },
    { id: "priority2", value: "Medium", label: "Medium" },
    { id: "priority3", value: "Low", label: "Low" },
  ];

export default function TaskForm() {

    // Initialisieren des Due Date mit aktuellem Datum
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);

    return (
        <>
            <label htmlFor="title"><h3>Task Name: *</h3></label>
            <input type="text" id="title" name="title" placeholder="Please enter a task name here" required />

            <label htmlFor="description"><h3>Description:</h3></label>
            <input type="text" id="description" name="description" placeholder="Optional: enter a task description here" />

            <label htmlFor="priority"><h3>Priority:</h3></label>
            <section>
                {priorityOptions.map((option) => (
                    <div key={option.id}>
                    <input
                        type="radio"
                        id={option.id}
                        name="priority"
                        value={option.value}
                        required={option.id === "priority1"}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                    </div>
                ))}
            </section>

            <label htmlFor="dueDate"><h3>Due Date:</h3></label>
            {/* onChange: Aktualisiert den Zustand "dueDate", wenn der Nutzer ein neues Datum wählt */}
            <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

            <button type="submit">Create Task</button>
        </>
    );
}