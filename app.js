"use strict";
import config from './src/config.js';
import DiscordBotClient from './src/lib/Client.js';
import minimist from 'minimist';

import _ from 'lodash';

const argv = minimist(process.argv);
const client = new DiscordBotClient(argv);
client.login(_.get(config, 'discord.token'));
