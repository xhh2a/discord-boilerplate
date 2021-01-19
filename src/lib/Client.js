"use strict";
import commando from 'discord.js-commando';
import constants from '../constants.js';
import { EventLoader } from './EventLoader.js';
import { CommandLoader } from './CommandLoader.js';

const { CommandoClient } = commando;
export default class DiscordBotClient extends CommandoClient {
  constructor(argv) {
    super({
      commandPrefix: process.env.DISCORD_PREFIX, // TODO: Replace with dynamic prefix
      owner: process.env.DISCORD_OWNER,
    });
    this.registry
      .registerDefaultTypes()
      .registerGroups([
		    [constants.commands.groups.statistics, 'Statistics'],
		    [constants.commands.groups.dresses, 'Dresses'],
	    ])
	    .registerDefaultGroups()
	    .registerDefaultCommands()
    // this.events = EventLoader(this);
    this.commands = CommandLoader(this);
    this.development = argv.dev || false;
  }
};
