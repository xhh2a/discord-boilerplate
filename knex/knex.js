"use strict";
import config from '../knexfile.js';
import knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
export default knex(config[environment]);