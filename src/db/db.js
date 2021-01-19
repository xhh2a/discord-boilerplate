'use strict'

import { Pool } from 'pg';
import knex from 'knex';
import moment from 'moment';
import _ from 'lodash';
import minimist from 'minimist';
const argv = minimist(process.argv);

export function connectionData() {
  return {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000, // Raise an error instead of hanging if the connection cannot connect within 2s
    idleTimeoutMillis: 5000, // Close this connection if unclosed and unused for more than  5s
  }
}

const connectionPool = new Pool(connectionData());
// TODO: Convert this to a shared pool, should not need to recreate one on every API call
export function getPool() {
  return connectionPool;
};

export function queryBuilder() {
  return knex({
    client: 'pg',
    connection: connectionData(),
    debug: process.argv.dev || false,
  });
}

export function parseTime(time) {
  const unix = /^[\d]+$/
  const dbFormat = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
  if (_.isNumber(time) || !_.isNil(time.match(unix))) { // If we get a unix timestamp in the JSON or a string with a unix timestamp
    const parsedTime = moment.unix(time).utc()
    return { timeUpdated: parsedTime, timeString: parsedTime.format(dbFormat) };
  } else {
    const parsedTime = moment.utc(time);
    return { timeUpdated: parsedTime, timeString: parsedTime.format(dbFormat) };
  }
}