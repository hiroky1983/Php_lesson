import axios from "../lib/axios";
import { Data, User } from "../pages/tasks";

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
  const getUser = async () => {
    const { data } = await axios.get<User>("api/user");
    return data;
  };
  const login = async (email: string, password: number) => {
    const { data } = await axios.post<Data>("api/login", { email, password });
    return data;
  };

  const logout = async () => {
    const { data } = await axios.post<Data>("api/logout");
    return data;
  };

  return {
    createTasks,
    deleteTasks,
    updateTasks,
    updateDone,
    getUser,
    login,
    logout,
  };
};
