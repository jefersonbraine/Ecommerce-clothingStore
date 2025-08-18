import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

// Obter a chave secreta do ambiente ou usar um valor padrão apenas para desenvolvimento
const authSecret =
  process.env.AUTH_SECRET ||
  process.env.BETTER_AUTH_SECRET ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "desenvolvimento_local_nao_usar_em_producao");

export const auth = betterAuth({
  secret: authSecret,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
});
