import { GatewayIntentBits } from 'discord.js'
import { ExtendedClient } from './client/Client'
import { env } from './utils/config'

const client = new ExtendedClient({
  intents: GatewayIntentBits.Guilds,
  env
})

void client.login().catch(err => {
  client.console.log('[Login Error]', err)
  process.exit(1)
})
