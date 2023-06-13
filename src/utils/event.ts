import type { Event, EventExec, EventKeys } from '../types/Event'
import { type ExtendedClient } from '../client/Client'
import path from 'path'
import { readdir } from 'fs/promises'

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
  await loadEventFiles(client)
}

async function loadEventFiles (client: ExtendedClient): Promise<void> {
  const eventsDir = path.join(__dirname, '..', 'events')

  const eventFiles: string[] = (await readdir(eventsDir)).filter(
    file => file.endsWith('.js') || file.endsWith('.ts')
  )

  for (const file of eventFiles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event: Event<any> =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (await import(`${eventsDir}/${file}`)).default as Event<any>

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
