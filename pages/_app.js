import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Task from '../db/models/Task';

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { mutate } = useSWR("/api/products");


  const router = useRouter();
  const { id } = router.query;

  const { data: tasks, isLoading } = useSWR(`/api/tasks`, fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!tasks) {
    return <h2>no task found...</h2>;
  }




  async function handleCreateTask(newTask) {
    // const taskWithId = { id: uuidv4(), ...newTask };
    // fügt neue task am Anfang hinzu LocalStorage
    // setTasks([taskWithId, ...tasks]);

    const task = new Task({ id: uuidv4(), ...newTask });
    await task.save();
    mutate('/api/tasks'); // Aktualisiert die SWR-Daten
  }
  // edit task with taskId and editedTask
  async function handleEditTask(taskId, editedTask) {
    // map over all tasks and replace the task with the same id
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
        // if task.id is the same as the taskId, return the editedTask
    //     task.id === taskId
    //       ? {
    //           //
    //           ...task,
    //           ...editedTask,
    //           //
    //           subTasks: editedTask.subTasks || task.subTasks,
    //         }
    //       : task
    //   )
    // );

    await Task.findByIdAndUpdate(taskId, editedTask, { new: true });
    mutate('/api/tasks'); // Aktualisiert die SWR-Daten
  }

 async function handleDeleteTask(taskId) {
      // const response = await fetch(`api/tasks/${taskId}`, { method: "DELETE", });
    // const updatedTasks = tasks.filter((task) => task.id !== taskId);

    // setTasks(updatedTasks);
    // router.push("/");

    await Task.findByIdAndRemove(taskId);
    mutate('/api/tasks'); // Aktualisiert die SWR-Daten
  }

  function handleToggleDone(id) {
    // const task = tasks.find((task) => task.id === id);
    // if (!task) {
    //   // Aufgabe nicht gefunden -> neue Aufgabe hinzufügen
    //   setTasks([...tasks, { id, isDone: true }]);
    // } else {
    //   // Aufgabe gefunden -> Status toggeln
    //   setTasks(
    //     tasks.map((task) =>
    //       task.id === id ? { ...task, isDone: !task.isDone } : task
    //     )
    //   );
    // }
    Task.findByIdAndUpdate(id, { $set: { isDone: { $not: "$isDone" } } }, { new: true })
    .then(() => mutate('/api/tasks')); // Aktualisiert die SWR-Daten
  }

  return (
    <>
      <Head>
        <title>Done - Workflow Wizard</title>
      </Head>
      <GlobalStyle />
      <RootLayout>
          <SWRConfig value={{ fetcher }}>
            <Component
              {...pageProps}
              tasks={tasks}
              onCreateTask={handleCreateTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              toggleDone={handleToggleDone}
            />
          </SWRConfig>
      </RootLayout>
    </>
  );
}
