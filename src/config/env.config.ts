import dotenv from 'dotenv';
import { EnvConfig, envSchema } from '../validation/env.validation';
import { ZodError } from 'zod';
dotenv.config();

export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      port: +envVars.PORT,
      env: envVars.NODE_ENV,
      MONGO_DB_URI: envVars.MONGO_DB_URI,
      jwtconfig: {
        accessSecret: envVars.JWT, 
        refreshaccessSecret: envVars.JWT_REFRESH,
      },
      smtp: {
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        service: envVars.SMTP_SERVICE,
        mail: envVars.SMTP_MAIL,
        password: envVars.SMTP_PASSWORD,
      },
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
