"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Greetings() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.greetings.hello.queryOptions());
  return <div>{data?.message}</div>;
}

export function Chats() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.chats.get.queryOptions());
  return <div>{data?.map((chat) => chat.title)}</div>;
}
