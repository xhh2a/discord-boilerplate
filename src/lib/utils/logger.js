import Scribe from 'scribe-js';
import Console2 from 'scribe-js/lib/console2.js';
import minimist from 'minimist';
import _ from 'lodash';

const argv = minimist(process.argv);

const getLogger = () => {
  // TODO: Log level
  if (process.console instanceof Console2) {
    return process.console;
  } else {
    Scribe();
    const consoleInstance = process.console;
    if (argv.dev) {
      consoleInstance.debug = consoleInstance.info;
    } else {
      consoleInstance.debug = _.noop;
    }
    return consoleInstance;
  }
}

export default getLogger();