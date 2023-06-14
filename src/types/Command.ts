import {
  type Awaitable,
  type ChatInputCommandInteraction,
  type SlashCommandBuilder
} from 'discord.js'
import { type ExtendedClient } from '../client/Client'

type LoggerFunction = (...args: unknown[]) => void

export interface CommandProps {
  interaction: ChatInputCommandInteraction
  client: ExtendedClient
  log: LoggerFunction
}

export type CommandExec = (props: CommandProps) => Awaitable<unknown>
export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, 'addSubCommand' | 'addSubCommandGroup'>

export interface Command {
  meta: CommandMeta
  exec: CommandExec
}
