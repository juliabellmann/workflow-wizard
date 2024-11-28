import mongoose from "mongoose";

const { Schema } = mongoose;

const subtaskSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { _id: false }
); // Disable _id for subdocuments

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: String, required: true },
  dueDate: { type: String, required: true },
  subTasks: [{ type: subtaskSchema }],
  isDone: { type: Boolean, required: true },
  tasklabel: { type: [String] },
});

const Task = mongoose.models?.Task || mongoose.model("Task", taskSchema);

export default Task;
