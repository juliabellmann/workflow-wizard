import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import initialTasks from "@/assets/tasks";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }) {
  const [tasks, setTasks] = useLocalStorageState("tasks-key", {
    defaultValue: initialTasks,
  });

  function handleCreateTask(newTask) {
    const taskWithId = { id: uuidv4(), ...newTask };
    // fügt neue task am Anfang hinzu
    setTasks([taskWithId, ...tasks]);
  }
  // edit task with taskId and editedTask
  function handleEditTask(taskId, editedTask) {
    // map over all tasks and replace the task with the same id
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        // if task.id is the same as the taskId, return the editedTask
        task.id === taskId
          ? {
              //
              ...task,
              ...editedTask,
              //
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

export default appWithTranslation(App)