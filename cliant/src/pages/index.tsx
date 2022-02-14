import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Next template</h1>
        <button onClick={() => router.push("/hello")}>ボタン</button>
      </main>
    </div>
  );
};

export default Home;
