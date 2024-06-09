import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ required_error: "Port number is required" }),
    NODE_ENV: z.enum(['development', "production", "test"]),
    MONGO_DB_URI: z.string({ required_error: "Db url is required" }),
    JWT: z.string({ required_error: "JWT is required" }),
    JWT_REFRESH:z.string({ required_error: "JWT Refres is required" }),
});
export type EnvConfig = z.infer<typeof envSchema>;