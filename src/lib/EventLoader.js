"use strict";

import messageHandler from "../events/message.js";
import readyHandler from '../events/ready.js';
import _ from "lodash";

export const EventLoader = (client) => {
  const events = {
    "message": messageHandler(client, undefined),
    "ready": readyHandler(client, undefined),
  }
  _.each(events, (handler, event) => {
    client.on(event, handler);
  })
  return events;
};
