import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import 'dotenv/config'
import { env } from '../../utils/config'
import postgres from 'postgres'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const runMigrate = async () => {
  const sql = postgres(env.DB_URI, { max: 1 })

  const db = drizzle(sql)

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch(err => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})
