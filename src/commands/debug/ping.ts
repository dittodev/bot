import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils/command'

const meta = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('ping the bot')

export default command(meta, async ({ interaction, client }) => {
  const msg = await interaction.reply({
    content: 'Pinging...',
    ephemeral: true,
    fetchReply: true
  })

  const ping = msg.createdTimestamp - interaction.createdTimestamp
  const apiPing = Math.round(client.ws.ping)

  await interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor('DarkButNotBlack')
        .setTitle('Pong!')
        .setDescription(
          `> Latency: \`${ping}\`ms\n> API Latency: \`${apiPing}\`ms`
        )
        .setTimestamp()
    ],
    content: ''
  })
})
