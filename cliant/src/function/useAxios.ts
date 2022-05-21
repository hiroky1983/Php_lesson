import axios from "../lib/axios";
import { Data } from "../pages/tasks";

export const useAxios = () => {
  const createTasks = async (title: string) => {
    const { data } = await axios.post<Data>("api/tasks", { title });
    return data;
  };
  const deleteTasks = async (id: number) => {
    const { data } = await axios.delete<Data>(`api/tasks/${id}`);
    return data;
  };

  return {
    createTasks,
    deleteTasks,
  };
};
