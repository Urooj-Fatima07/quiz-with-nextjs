import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-1/3 items-center justify-between h-screen py-24">
      <h1 className="text-white font-bold text-2xl">
        Quiz App
      </h1>
      <p className="text-white font-normal text-2xl">
        Want to test your Knoweldge? <br />
        Lets play a game ...
      </p>
      <Link href='/quiz'>
        <button className="bg-white mx-auto my-4 text-blue-900 px-4 py-2">
          Start Quiz
        </button>
      </Link>
    </main>
  );
}
