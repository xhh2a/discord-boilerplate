"use_strict";

import Command from "../lib/commands/Command.js";
import _ from "lodash";
import constants from '../constants.js';
import logger from '../lib/utils/logger.js';

export class TrackBase extends Command {
  constructor(client, args) {
    super(
      client,
      _.defaults(
        args,
        {
          guildOnly: true,
          args: [ // TODO: Replace this with argparse and response library instead of using commando's
            {
              key: 'boss',
              prompt: 'Which boss or content is this for?',
              type: 'string',
            },
            {
              key: 'team',
              prompt: 'What team are you tracking?',
              type: 'string',
            },
            {
              key: 'damage',
              prompt: 'How much damage did you do?',
              type: 'float',
            },
            {
              key: 'flags',
              prompt: 'Additional arguments',
              type: 'string',
              infinite: true,
              default: ''
            }
          ]
        }
      )
    );
    this.mock = _.get(args, 'mock', false);
  }

  async run(message, args) {
    logger.info(args);
    message.react('✅');
    // TODO: Do you want to delete or reply to original message?
    message.say(`Statistics not yet implemented`);
  }
};

export class TrackMock extends TrackBase {
  constructor(client, options = {}) {
    super(
      client,
      _.defaults(
        options,
        {
          name: 'mock',
          aliases: ['tm'],
          group: constants.commands.groups.statistics,
          memberName: 'mock',
          description: 'Record a mock battle result',
          mock: true
        }
      )
    );
  }
}

export class TrackRun extends TrackBase {
  constructor(client, options = {}) {
    super(
      client,
      _.defaults(
        options,
        {
          name: 'battle',
          aliases: ['tb'],
          group: constants.commands.groups.statistics,
          memberName: 'battle',
          description: 'Record an actual battle result',
          guildOnly: true,
          mock: false
        }
      )
    );
  }
}