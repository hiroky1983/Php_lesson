import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import useSWR, { mutate } from "swr";
import { useAxios } from "../function/useAxios";
import axios from "../lib/axios";

export type Data = {
  id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
};
export type User = {
  id: number;
  name: string;
  email: string;
};
type IErrorResponse = {
  message: string;
};

const Tasks: NextPage = () => {
  const { data, error } = useSWR<Data[]>("/api/tasks", () =>
    axios.get("/api/tasks").then((res) => res.data)
  );
  const [title, setTilte] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [err, setErr] = useState<AxiosError<IErrorResponse> | undefined>(
    undefined
  );
  const [editErr, setEditErr] = useState<
    AxiosError<IErrorResponse> | undefined
  >(undefined);

  const router = useRouter();
  const { createTasks, deleteTasks, updateDone, updateTasks, logout } =
    useAxios();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    if (err) {
      setErr(undefined);
    }
    try {
      const res = await createTasks(title);
      if (!res) {
        throw new Error("error");
      }
      mutate("/api/tasks");
      setTilte("");
    } catch (e) {
      setErr(e as AxiosError<IErrorResponse>);
    }
  };

  const onBlur = async (id: number, title: string) => {
    if (editTitle === title) {
      setEditTitle("");
      return;
    }
    try {
      const res = await updateTasks(id, editTitle);
      if (!res) {
        throw new Error("error");
      }
      mutate("/api/tasks");
      setEditTitle("");
    } catch (e) {
      let error = e as AxiosError<IErrorResponse>;
      setEditErr(error);
      alert(error.response?.data.message);
      setEditTitle("");
      setEditErr(undefined);
    }
  };

  console.log(title);
  console.log(editTitle);
  console.log(editErr);

  const logoutHandler = () => {
    logout();
    router.replace("/");
  };

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;

  return (
    <div className="mx-32 my-4">
      <div className="flex justify-between">
        <h1>Tasks</h1>
        <button className="text-blue-500 underline" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="border shadow-lg rounded-md my-4 p-2 pl-3 mr-6 w-1/2"
          type="text"
          value={title}
          onChange={(e) => setTilte(e.target.value)}
          placeholder="タスクを入力してください"
        />

        <button
          className="bg-orange-400 text-white rounded-lg px-4 py-1 hover:opacity-70"
          type="submit"
        >
          追加
        </button>
        {err && (
          <p className="text-red-500 text-sm">※{err.response?.data.message}</p>
        )}
      </form>
      <ul>
        {data.map((d) => (
          <div
            key={d.id}
            className="flex items-center my-2 p-4 shadow-lg rounded-md w-2/3"
          >
            <input
              id={String(d.id)}
              type="checkbox"
              checked={d.is_done}
              onChange={() => {
                updateDone(d.id, !d.is_done);
                mutate("/api/tasks");
              }}
              className="mr-4 bg-orange-500"
            />
            <li className="flex-grow text-lg font-medium ">
              <input
                type="text"
                defaultValue={d.title}
                className={`focus:outline-none ${
                  d.is_done && "opacity-50 line-through"
                }`}
                onClick={() => setEditTitle(d.title)}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
                onBlur={() => onBlur(d.id, d.title)}
              />
            </li>
            <button
              className={`bg-orange-400 text-white rounded-lg px-4 py-1 hover:opacity-70`}
              onClick={() => {
                deleteTasks(d.id);
                mutate("/api/tasks");
              }}
            >
              削除
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
