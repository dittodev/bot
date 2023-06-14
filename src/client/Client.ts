import { type ConsolaInstance, consola } from 'consola'
import { Client, type ClientEvents, Collection } from 'discord.js'
import { type ExtendedClientOptions } from '../types/Client'
import { type EnvType } from '../types/Config'
import { registerEvents } from '../utils/event'
import postgres, { type Sql } from 'postgres'
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import { type Event } from 'src/types/Event'

export class ExtendedClient extends Client {
  public readonly env: EnvType
  public readonly console: ConsolaInstance = consola
  private readonly postgresClient: Sql
  public db: PostgresJsDatabase<Record<string, never>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public events = new Collection<keyof ClientEvents, Event<any>>()

  constructor (options: ExtendedClientOptions) {
    super(options)
    this.env = options.env
    this.postgresClient = postgres(this.env.DB_URI)
    this.db = drizzle(this.postgresClient)
    this.console.wrapConsole()
  }

  override async login (): Promise<string> {
    await registerEvents(this)
    return await super.login(this.env.TOKEN)
  }
}
