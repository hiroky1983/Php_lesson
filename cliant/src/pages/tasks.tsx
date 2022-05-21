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

const Tasks: NextPage = () => {
  const { data, error } = useSWR<Data[]>("/api/tasks", () =>
    axios.get("/api/tasks").then((res) => res.data)
  );
  const [title, setTilte] = useState("");
  const [err, setErr] = useState("");
  const { createTasks, deleteTasks, updateDone } = useAxios();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    if (err) {
      setErr("");
    }
    try {
      const data = await createTasks(title);
      if (!data) {
        throw new Error("error");
      }
      mutate("/api/tasks");
      setTilte("");
    } catch (e: any) {
      const err: string = e.response.data.message;
      setErr(err);
    }
  };

  console.log(err);

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;

  return (
    <div className="mx-32 my-4">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-black mt-4 px-2 mr-4"
          type="text"
          value={title}
          onChange={(e) => setTilte(e.target.value)}
        />

        <button
          className="bg-orange-400 text-white rounded-lg px-4 py-1"
          type="submit"
        >
          追加
        </button>
        {err && <p className="text-red-500 text-sm">※{err}</p>}
      </form>
      <ul>
        {data.map((d) => (
          <div key={d.id} className="flex p-1 items-center">
            <input
              id={String(d.id)}
              type="checkbox"
              checked={d.is_done}
              onChange={() => {
                updateDone(d.id, !d.is_done);
                mutate("/api/tasks");
              }}
              className="mr-2"
            />
            <li
              className={`flex-grow ${d.is_done && "opacity-50 line-through"}`}
            >
              {d.title}
            </li>
            <button
              className={`bg-orange-400 text-white rounded-lg px-4 py-1`}
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
