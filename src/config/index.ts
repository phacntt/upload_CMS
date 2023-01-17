import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_DATABASE_URL, HOST, SECRET_KEY, API_KEY_ACCESSTRADE, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, ORIGIN } = process.env;
