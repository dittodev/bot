import { type ClientOptions } from 'discord.js'
import { type EnvType } from './Config'

export interface ExtendedClientOptions extends ClientOptions {
  env: EnvType
}
