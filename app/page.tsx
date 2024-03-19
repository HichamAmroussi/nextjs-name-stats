"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const {push} = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    push(`/prediction/${inputVal}`);
  }

  return (
    <main className="bg-white min-h-screen flex gap-10 flex-col items-center justify-center">
      <div className="bg-gray-100 py-10 px-6 rounded-xl shadow-sm flex gap-10 flex-col items-center">
        <h1 className="text-3xl font-bold">Statistiques du prénom</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Entre le prénom..."
            className="px-5 py-3 rounded-lg outline-none"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            required
          />
          <button className="bg-blue-200 font-bold text-sm ml-2 py-3 px-5 rounded-full hover:bg-blue-300 duration-300">Confirmer</button>
        </form>
      </div>
    </main>
  );
}
