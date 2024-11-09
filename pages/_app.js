import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import initialTasks from "@/assets/tasks";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";

export default function App({ Component, pageProps }) {

  const [tasks, setTasks] = useLocalStorageState("tasks-key", {defaultValue: initialTasks});

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

  return (
    <>
      <GlobalStyle />
      <RootLayout>
        <Component 
          {...pageProps} 
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          />
      </RootLayout>
    </>
  );
}
