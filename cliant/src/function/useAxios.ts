import axios from "../lib/axios";

export const useAxios = () => {
  const createTasks = async (title: string) => {
    const { data } = await axios.post("api/tasks", { title });
    return data;
  };
  const deleteTasks = async (id: number) => {
    const { data } = await axios.delete(`api/tasks/${id}`);
    return data;
  };

  return {
    createTasks,
    deleteTasks,
  };
};
