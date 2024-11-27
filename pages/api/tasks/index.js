import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  console.log("in api route");

  // add error handling for GET Request
  if (request.method === "GET") {
    try {
      const tasks = await Task.find();
      return response.status(200).json(tasks);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error fetching places", error: error.message });
    }
  }

  // function to create a new task with POST Request
  if (request.method === "POST") {
    try {
      const taskData = request.body;

      console.log("taskData", taskData);
      await Task.create(taskData);
      return response.status(201).json({ status: "Task created" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
