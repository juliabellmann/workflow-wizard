import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const task = await Task.findById(id);

      if (!task) {
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json(task);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error fetching task", error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Task.findByIdAndDelete(id);
      return response.status(200).json({ message: "Task deleted!" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error deleting task", error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const taskData = request.body;

      console.log("taskData", taskData.isToggleDone);

      // 1. Prüfen, ob die gesamte Task getoggelt werden soll
      if (taskData.isToggleDone) {
        const task = await Task.findById(id);

        console.log("task", task);
        if (!task) {
          return response.status(404).json({ message: "Task not found" });
        }

        // setzte true oder toggle isDone
        task.isDone = task.isDone ? !task.isDone : true;

        // Speichern der Task
        await task.save();

        return response
          .status(200)
          .json({ message: "Task toggled successfully", task });
      }

      // 2. Prüfen, ob eine Subtask aktualisiert werden soll
      if (taskData.isSubtask) {
        const { subtaskId, completed } = taskData;

        const task = await Task.findById(id);
        if (!task) {
          return response.status(404).json({ message: "Task not found" });
        }

        // Subtask aktualisieren
        const subtask = task.subTasks.find((sub) => sub.id === subtaskId);
        if (!subtask) {
          return response.status(404).json({ message: "Subtask not found" });
        }

        subtask.completed = completed;

        // Speichern der Task
        await task.save();

        return response.status(200).json({ message: "Subtask updated", task });
      }

      // 3. Aktualisieren der gesamten Task
      const updatedTask = await Task.findByIdAndUpdate(id, taskData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTask) {
        return response.status(404).json({ message: "Task not found" });
      }

      return response
        .status(200)
        .json({ message: "Task updated", updatedTask });
    } catch (error) {
      console.error("Error in PUT handler:", error);
      return response
        .status(500)
        .json({ message: "Error updating task", error: error.message });
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
