import { AxiosError } from "axios";
import { NextPage } from "next";
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
type IErrorResponse = {
  message: string;
};

const Tasks: NextPage = () => {
  const { data, error } = useSWR<Data[]>("/api/tasks", () =>
    axios.get("/api/tasks").then((res) => res.data)
  );
  const [title, setTilte] = useState("");
  const [err, setErr] = useState<AxiosError<IErrorResponse> | undefined>(
    undefined
  );
  const { createTasks, deleteTasks, updateDone } = useAxios();

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

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;

  return (
    <div className="mx-32 my-4">
      <h1>Tasks</h1>
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
            className="flex items-center my-2 p-4 shadow-lg rounded-md"
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
            <li
              className={`flex-grow text-lg font-medium ${
                d.is_done && "opacity-50 line-through"
              }`}
            >
              {d.title}
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
