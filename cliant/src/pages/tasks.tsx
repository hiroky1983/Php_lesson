import { NextPage } from "next";
import useSWR from "swr";
import axios from "../lib/axios";

type Data = {
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

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;

  console.log(data);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
