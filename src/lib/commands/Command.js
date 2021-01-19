"use strict";
import commando from 'discord.js-commando';
import _ from 'lodash';

const { Command } = commando;

export default class DiscordCommand extends Command {
  constructor(client, options = {}) {
    super(
      client,
      _.defaults(
        options,
        {
          name: 'undefined',
          aliases: [],
          group: 'utils',
          guildOnly: true,
          memberName: 'undefined',
          description: 'Undefined',
        }
      )
    );
  }

  run(message) {
    context.send('This command does not have an executor function.');
  }

  get fullName() {
    return `${this.group}/${this.name}`;
  }

  /*
  static sendErrorMessage(ctx, message) {
    const embed = new Discord.RichEmbed().setColor(0xff0000).setDescription(message);

    ctx.channel.send(embed);
  }

  static validateOptions(options = {}) {
    if (!(options instanceof Object)) throw Error('Command options must be an Object.');
    if (!options.name) throw Error('You must define a command name.');
  }
  */
};
