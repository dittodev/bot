import { event } from '../utils/event'
import { guild as guildSchema } from '../lib/db/schema'

export default event('guildCreate', async ({ log, client }, guild) => {
  const result = await client.db
    .insert(guildSchema)
    .values({ id: guild.id, name: guild.name, memberCount: guild.memberCount })
    .onConflictDoUpdate({
      target: guildSchema.id,
      set: { id: guild.id, name: guild.name, memberCount: guild.memberCount }
    })

  log(`result from drizzle: ${result.toString()}`)
})
