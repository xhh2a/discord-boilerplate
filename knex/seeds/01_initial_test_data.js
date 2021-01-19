"use strict";

import Server from "../models/server.js";

export async function seed(knex, Promise) {
  await knex('servers').del();
  const result = await Server.bulk_import(knex, [
    new Server({name: 'first_server', discord_id: '1'}).save(),
    new Server({name: 'second_server', discord_id: '2'}).save(),
  ]);
  console.dir(result);
};
