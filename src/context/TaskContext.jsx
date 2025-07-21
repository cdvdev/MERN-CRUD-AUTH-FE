import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task.js";

const TaskContext = createContext();

export const useTasks = () => {
  const contex = useContext(TaskContext);
  if (!contex) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return contex;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    const res = await getTaskRequest(id);
    return res.data 
  };
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
        const res = await updateTaskRequest(id, task);
        console.log(res);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTask,
        getTasks,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
