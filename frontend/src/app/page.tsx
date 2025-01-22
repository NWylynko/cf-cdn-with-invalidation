"use client";

import { useMutation } from "@tanstack/react-query";
import { env } from "./env";

export default function Home() {
  const { data, mutate: getData } = useMutation({
    mutationFn: async () => {
      const start = performance.now();
      const response = await fetch(env.NEXT_PUBLIC_API_URL, { method: "GET" });
      const end = performance.now();
      const duration = end - start;
      const result = await response.json();

      const headers: Record<string, string> = {};

      for (const [key, value] of response.headers.entries()) {
        headers[key] = value;
      }

      return { ...result, duration, headers };
    },
  });

  const { mutate: updateData } = useMutation({
    mutationFn: async () => {
      await fetch(env.NEXT_PUBLIC_API_URL, { method: "POST" });
    },
  });

  return (
    <main>
      <h1>Hello App</h1>
      <button onClick={() => getData()} className="border rounded shadow bg-zinc-100 m-4 p-4">
        Fetch from API
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => updateData()} className="border rounded shadow bg-zinc-100 m-4 p-4">
        Update data in API
      </button>
    </main>
  );
}
