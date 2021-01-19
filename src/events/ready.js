"use strict";

import logger from '../lib/utils/logger.js';
export default (client, args) => {
  return () => {
    logger.info(`${client.user.username}#${client.user.discriminator} bot has connected to discord!`);
  };
};
