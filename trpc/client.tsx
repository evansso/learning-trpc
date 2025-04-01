"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

import superjson from "superjson";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@/trpc/server/routers/_app";
import { makeQueryClient } from "./query-client";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function getUrl() {
  // During SSR, we should use relative URLs
  if (typeof window === "undefined") {
    return "/api/trpc";
  }

  // Client-side only
  const base = (() => {
    if (process.env.NODE_ENV === "development") return "http://localhost:3000";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.NEXT_PUBLIC_VERCEL_URL)
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return "";
  })();
  return `${base}/api/trpc`;
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
          // Disable batching during SSR
          headers: () => {
            return {
              "x-trpc-source":
                typeof window === "undefined" ? "server" : "client",
            };
          },
        }),
      ],
    })
  );

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPCProvider>
  );
}
