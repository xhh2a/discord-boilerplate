"use strict";

import KnexModel from './knex_model.js';

// servers.uuid('uuid').primary();
// servers.string('name').notNull();
// servers.string('discord_id').notNull();
// servers.unique('discord_id');
// servers.string('prefix').notNull();
// servers.timestamps(true, true);
export default class Server extends KnexModel {
  constructor(params) {
    super(params);
  }

  static tableName() {
    return 'servers';
  }
  
  static attributes() {
    return super.attributes(['uuid', 'name', 'discord_id', 'prefix']);
  }

  static uniqueAttributes() {
    return super.attributes(['discord_id']);
  }
}