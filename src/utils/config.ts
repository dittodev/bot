import 'dotenv/config'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    TOKEN: z.string().min(1),
    DB_URI: z.string().min(1)
  },
  runtimeEnv: process.env
})
