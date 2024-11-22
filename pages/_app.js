import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import initialTasks from "@/assets/tasks";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [tasks, setTasks] = useLocalStorageState("tasks-key", {
    defaultValue: initialTasks,
  });
  const [toggleButtonName, setToggleButtonName] = useState("Delete");

  function handleCreateTask(newTask) {
    const taskWithId = { id: uuidv4(), ...newTask };
    // fügt neue task am Anfang hinzu
    setTasks([taskWithId, ...tasks]);
  }

  function handleEditTask(taskId, editedTask) {
    console.log("editedTask", editedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...editedTask,
              subTasks: editedTask.subTasks || task.subTasks,
            }
          : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    // router.push("/");
  }

  function handleToggleDone(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      // Aufgabe nicht gefunden -> neue Aufgabe hinzufügen
      setTasks([...tasks, { id, isDone: true }]);
    } else {
      // Aufgabe gefunden -> Status toggeln
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        )
      );
    }
  }

  return (
    <>
      <Head>
        <title>Done - Workflow Wizard</title>
      </Head>
      <GlobalStyle />
      <RootLayout>
        <Component
          {...pageProps}
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          toggleDone={handleToggleDone}
        />
      </RootLayout>
    </>
  );
}
