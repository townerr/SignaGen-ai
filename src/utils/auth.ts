import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db";
import * as schema from "~/db/schema";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
           user: schema.user,
         },
    }),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
       github: { 
        clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string, 
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string, 
       } 
    }, 
});