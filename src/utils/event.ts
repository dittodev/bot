import type { Event, EventExec, EventKeys } from '../types/Event'
import { type ExtendedClient } from '../client/Client'

export function event<T extends EventKeys> (
  id: T,
  exec: EventExec<T>
): Event<T> {
  return {
    id,
    exec
  }
}

export function registerEvents (
  client: ExtendedClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: Array<Event<any>>
): void {
  for (const event of events) {
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
  }
}
