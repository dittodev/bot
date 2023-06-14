import { event } from '../utils/event'
import { EditReply, Reply } from '../utils/replies'

export default event(
  'interactionCreate',
  async ({ client, log }, interaction) => {
    if (!interaction.isChatInputCommand()) return

    try {
      const commandName = interaction.commandName
      const command = client.commands.collection.get(commandName)

      if (command == null) throw new Error('Command not found...')

      await command.exec({
        client,
        interaction,
        log (...args) {
          log(`[${command.meta.name}]`, ...args)
        }
      })
    } catch (error) {
      log('[Command Error]', error)

      if (interaction.deferred) {
        return await interaction.editReply(
          EditReply.error('Something went wrong :(')
        )
      }

      return await interaction.reply(Reply.error('Something went wrong :('))
    }
  }
)
