import type { Event, EventExec, EventKeys } from '../types/Event'
import { type ExtendedClient } from '../client/Client'
import { Collection } from 'discord.js'
import { loadFiles } from './fileLoader'

export function event<T extends EventKeys> (
  id: T,
  exec: EventExec<T>
): Event<T> {
  return {
    id,
    exec
  }
}

export async function registerEvents (client: ExtendedClient): Promise<void> {
  client.events = new Collection()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const files = await loadFiles('events')

  for (const file of files) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const event: Event<any> =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (await import(`${file}`)).default as Event<any>

      client.events.set(event.id, event)

      client.on(
        event.id,
        event.exec.bind(null, {
          client,
          log: (...args) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            client.console.info(`[${event.id}]`, ...args)
          }
        })
      )
    } catch (err) {
      console.error(err)
    }
  }
}
