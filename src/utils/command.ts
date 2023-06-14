import { Collection } from 'discord.js'
import type { ExtendedClient } from '../client/Client'
import type { Command, CommandExec, CommandMeta } from '../types/Command'
import { loadFiles } from './fileLoader'

export function command (meta: CommandMeta, exec: CommandExec): Command {
  return {
    meta,
    exec
  }
}

export async function registerCommands (client: ExtendedClient): Promise<void> {
  client.commands.collection = new Collection()
  client.commands.array = []
  const files = await loadFiles('commands')

  for (const file of files) {
    try {
      const command: Command = (await import(`${file}`)).default as Command

      client.commands.collection.set(command.meta.name, command)
      client.commands.array.push(command)
    } catch (err) {
      console.error(err)
    }
  }
}
