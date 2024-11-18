import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import initialTasks from "@/assets/tasks";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const [tasks, setTasks] = useLocalStorageState("tasks-key", {defaultValue: initialTasks});
  const [toggleButtonName, setToggleButtonName] = useState("Delete");

  function handleCreateTask(newTask) {
    const taskWithId = { id: uuidv4(), ...newTask };
    // fügt neue task am Anfang hinzu
    setTasks([taskWithId, ...tasks]);
  }

  function handleUpdateTask(updatedTask) {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleToggleDone(id) {
    const task = tasks.find((task) => task.id === id);
    if(!task) {
      // Aufgabe nicht gefunden -> neue Aufgabe hinzufügen
      setTasks([...tasks, {id, isDone: true }]);
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
          onUpdateTask={handleUpdateTask}
          toggleDone={handleToggleDone}
          />
      </RootLayout>
    </>
  );
}
