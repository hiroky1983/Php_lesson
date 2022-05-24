import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAxios } from "../function/useAxios";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<number>();
  const { login, getUser } = useAxios();

  const router = useRouter();
  const onClickLogin = async () => {
    await login(email, password!);
    router.push("/tasks");
  };
  const sampleLogin = async () => {
    await login("admin@exsample.com", 123456789);
    router.push("/tasks");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Laravel Task</h1>
        <input
          className="border shadow-lg rounded-md my-4 p-2 pl-3 mr-6 w-1/2"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="border shadow-lg rounded-md my-4 p-2 pl-3 mr-6 w-1/2"
          type="password"
          value={password}
          onChange={(e) => setPassword(Number(e.target.value))}
        />
        <div>
          <button
            className="bg-orange-400 text-white rounded-lg px-4 py-1 hover:opacity-70 mr-2"
            onClick={onClickLogin}
          >
            Login
          </button>
          <button
            className="bg-orange-400 text-white rounded-lg px-4 py-1 hover:opacity-70"
            onClick={sampleLogin}
          >
            テストログイン
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
