import dotenv from 'dotenv';
import { EnvConfig, envSchema } from '../validation/env.validation';
import { ZodError } from 'zod';
dotenv.config();

export const MONGO_DB_CONNECTION = process.env.MONGO_DB_URI;
export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      port: +envVars.PORT,
      env: envVars.NODE_ENV,
      MONGO_DB_URI: envVars.MONGO_DB_URI
    };
  } catch (error) {
    let message = undefined;
    if (error instanceof ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      message = error.errors;
      console.error('Validation failed:', error.errors);
    } else {
      // message = error;
      console.error('Error parsing environment variables:', error);
    }
  }
};
