import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema',
  out: './src/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: Number.parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME as string,
  },
});
