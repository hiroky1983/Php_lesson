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
  const updateTasks = async (id: number, title: string) => {
    const { data } = await axios.put<Data>(`api/tasks/${id}`, { title });
    return data;
  };
  const updateDone = async (id: number, is_done: boolean) => {
    const { data } = await axios.patch<Data>(`api/tasks/update-done/${id}`, {
      is_done,
    });
    return data;
  };

  return {
    createTasks,
    deleteTasks,
    updateTasks,
    updateDone,
  };
};
