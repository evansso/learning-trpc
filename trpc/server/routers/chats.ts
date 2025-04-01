import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { db } from '@/db'


export const chatsRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    const chats = await db.query.chat.findMany();
    return chats;
  }),
});

export type ChatsRouter = typeof chatsRouter;