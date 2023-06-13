import type { Config } from 'drizzle-kit'
import { env } from './src/utils/config'

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  connectionString: env.DB_URI,
  breakpoints: true
} satisfies Config
