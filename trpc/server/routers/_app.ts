import { createTRPCRouter } from '@/trpc/init'
import { chatsRouter } from './chats'
import { greetingsRouter } from './greetings'

export const appRouter = createTRPCRouter({
  chats: chatsRouter,
  greetings: greetingsRouter,
})

export type AppRouter = typeof appRouter;
