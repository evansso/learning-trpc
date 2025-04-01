import { baseProcedure, createTRPCRouter } from '@/trpc/init'
 
export const greetingsRouter = createTRPCRouter({
  greeting: baseProcedure.query(() => 'hello tRPC v10!'),
  
  hello: baseProcedure.query(() => {
    return {
        message: 'Hello World'
    }
  })
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type GreetingsRouter = typeof greetingsRouter;