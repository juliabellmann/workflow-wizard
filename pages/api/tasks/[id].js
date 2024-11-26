import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(id);

    if (!task) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(task);
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
