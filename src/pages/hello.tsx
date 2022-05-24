import { AxiosResponse } from "axios";
import type { NextPage } from "next";
import useSWR from "swr";
import axios from "../lib/axios";

type Data = {
  name: string;
};

const Hello: NextPage = () => {
  const { data, error } = useSWR<Data[]>("/api/hello", () =>
    axios.get("/api/hello").then((res: AxiosResponse) => res.data)
  );

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中</div>;
  return (
    <div className="m-auto w-4/5">
      <h1>ようこそ, next.js</h1>
      <hr />
      <ul className="mt-4 grid grid-cols-2 gap-7">
        {data.map((d, i) => (
          <li key={i} className="rounded-xl text-center shadow-2xl p-4">
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hello;
