import { type Event } from '../types/Event'
import guildCreate from './guildCreate'
import ready from './ready'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events: Array<Event<any>> = [ready, guildCreate]

export { events }
