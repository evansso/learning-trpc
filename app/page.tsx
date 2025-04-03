import { prefetch, trpc } from "@/trpc/server";
import { Greetings, Chats } from "./greetings";
import { Suspense } from "react";

export default async function Home() {
  // Prefetch queries during SSR
  await Promise.all([
    prefetch(trpc.greetings.hello.queryOptions()),
    prefetch(trpc.chats.get.queryOptions()),
  ]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Greetings />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Chats />
      </Suspense>
    </div>
  );
}
