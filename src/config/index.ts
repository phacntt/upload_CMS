import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_DATABASE_URL, HOST, SECRET_KEY, AC_API_KEY } = process.env;
