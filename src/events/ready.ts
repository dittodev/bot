import { guild } from '../lib/db/schema'
import { event } from '../utils/event'

export default event('ready', async ({ log, client }) => {
  const guildcount = (await client.db.select().from(guild)).length
  log(`Logged in. Current guild count: ${guildcount}`)
  const commandMetaArray = client.commands.collection.map(
    command => command.meta
  )
  void client.application?.commands.set(commandMetaArray)
})
