import { parse } from "discord-command-parser";
import _ from 'lodash';
import logger from '../lib/utils/logger.js';
import config from '../config.js';
import CommandContext from '../lib/commands/CommandContext.js';

export default (client, args) => {
  return message => {
    const prefix = config.discord.prefix; // TODO: Get by discord
    const parsedParams = parse(message, prefix, { allowSpaceBeforeCommand: true });
    if (!parsedParams.success) {
      logger.debug(`Received message ${message}`);
      return;
    };

    const command = _.get(client.commands, parsedParams.command, undefined);
    if (_.isNil(command)) {
      logger.debug(`Skipping unrecognized command ${parsedParams.command}`);
      return;
    };
    logger.debug(`Executing command ${parsedParams.command}`);
    const context = new CommandContext({ client, message });
    try {
      command.run(context, message, parsedParams);
    } catch (error) {
      logger.error(`An error has occured while executing command: '${command.fullName}'`, error);
    }
  };
};
