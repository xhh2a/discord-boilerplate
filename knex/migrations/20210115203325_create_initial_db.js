"use strict";

export async function up(knex, Promise) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await knex.schema.createTable(
    'servers',
    (servers) => {
      servers.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v4()'));

      servers.string('name').notNull();
      servers.string('discord_id').notNull();
      servers.unique('discord_id');

      // TODO: Allow storing multiple prefixes for different groups
      servers.string('prefix').notNull();

      servers.timestamps(true, true);
    }
  );

  await knex.schema.createTable(
    'prefixes',
    (prefixes) => {
      prefixes.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v4()'));

      prefixes.string('type').notNull().defaultTo('main'); // TODO: Constants

      prefixes.uuid('server_uuid').notNull();
      prefixes.foreign('server_uuid')
        .references('servers.uuid')
        .onDelete('CASCADE');
      prefixes.unique(['server_uuid', 'type']);
    }
  );
 
  await knex.schema.createTable(
    'games',
    (games) => {
      games.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      games.string('name').notNull();
      games.index('name');

      games.timestamps(true, true);
    }
  );

  await knex.schema.createTable(
    'users',
    (users) => {
      users.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      users.string('discord_id').notNull(); // Postgres doesn't support UInt64, which is discords uuid format
      users.unique('discord_id');

      users.timestamps(true, true);
    }
  );
};

export async function down(knex, Promise) {
  await knex.schema.dropTableIfExists('games');
  await knex.schema.dropTableIfExists('prefixes');
  await knex.schema.dropTableIfExists('servers');
  return knex.schema.dropTableIfExists('users');
};
