import { type ConsolaInstance, consola } from 'consola'
import { Client } from 'discord.js'
import { type ExtendedClientOptions } from '../types/Client'
import { type EnvType } from '../types/Config'
import { registerEvents } from '../utils/event'
import postgres, { type Sql } from 'postgres'
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

export class ExtendedClient extends Client {
  public readonly env: EnvType
  public readonly console: ConsolaInstance = consola
  private readonly postgresClient: Sql
  public db: PostgresJsDatabase<Record<string, never>>
  constructor (options: ExtendedClientOptions) {
    super(options)
    this.env = options.env
    this.postgresClient = postgres(this.env.DB_URI)
    this.db = drizzle(this.postgresClient)
  }

  override async login (): Promise<string> {
    await registerEvents(this)
    return await super.login(this.env.TOKEN)
  }
}
