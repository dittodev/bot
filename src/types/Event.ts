import { type ClientEvents, type Awaitable } from 'discord.js'
import { type ExtendedClient } from '../client/Client'

type LoggerFunction = (...args: unknown[]) => void

export interface EventProps {
  client: ExtendedClient
  log: LoggerFunction
}

export type EventKeys = keyof ClientEvents
export type EventExec<T extends EventKeys> = (
  props: EventProps,
  ...args: ClientEvents[T]
) => Awaitable<void>
export interface Event<T extends EventKeys> {
  id: T
  exec: EventExec<T>
}
