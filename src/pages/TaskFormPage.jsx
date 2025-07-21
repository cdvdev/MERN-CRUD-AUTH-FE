// TaskFromPage.jsx

import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskForemPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        console.log(dayjs(task.date).utc().format("YY/MM/DD"));
        console.log(task.date);

        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log({
      ...data,
      date: dayjs.utc(data.date).format(),
    });
    const dataValid = {
      ...data,
      date: dayjs.utc(data.date).format(),
    };
    if (!data.date) dataValid.date = dayjs.utc().format();
    console.log(dataValid);
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows="3"
          placeholder="Descriptions"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        ></textarea>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default TaskForemPage;
