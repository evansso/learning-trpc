import { prefetch, trpc } from "@/trpc/server";
import { Greetings, Chats } from "./greetings";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  prefetch(trpc.greetings.hello.queryOptions());
  prefetch(trpc.chats.get.queryOptions());

  return (
    <div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Greetings />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Chats />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
