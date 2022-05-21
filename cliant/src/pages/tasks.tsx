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
  const { createTasks, deleteTasks } = useAxios();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    createTasks(title);
    mutate("/api/tasks");
    setTilte("");
  };

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;

  console.log(data);

  return (
    <div className="mx-20">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-black"
          type="text"
          value={title}
          onChange={(e) => setTilte(e.target.value)}
        />
        <button
          className="bg-orange-400 text-white rounded-lg px-4"
          type="submit"
        >
          追加
        </button>
      </form>
      <ul>
        {data.map((d) => (
          <div key={d.id} className="flex justify-between p-1">
            <li>{d.title}</li>
            <button
              className="bg-orange-400 text-white rounded-lg px-4"
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
