"use strict";
import _ from 'lodash';
import { TrackMock, TrackRun } from "../commands/track_run.js";

const logger = process.console;

// export const CommandLoader = () => {
//   const commands = {
//     "mock": new TrackRunCommand({mock: true}),
//     "report": new TrackRunCommand({mock: false}),
//     //"team": new TeamModificationCommand(),
//     //"stats": new StatisticsCalculationCommand(),
//   };
//   const aliases = {}
//   _.each(
//     commands,
//     (command, _key) => {
//       _.each(
//         command.aliases,
//         (alias) => {
//           aliases[alias] = command;
//         }
//       );
//     }
//   );
//   return _.merge(commands, aliases);
// };

export const CommandLoader = (client) => {
  client.registry.registerCommands([
    new TrackMock(client),
    new TrackRun(client)
  ]);
}