import '@/http/nodegen/utils/logger.js';
import serverCli from '@/server.cli.js';
import run from '@/cli/run.js';
import config from '@/config.js';
import http from '@/http/index.js';

const cliInput = serverCli();
const PORT = cliInput.port || config.port;

http(PORT)
  .then(async (http) => {
    if (cliInput['run-script']) {
      return run(cliInput['run-script'], cliInput);
    } else {
      await http.start();
    }
  }).catch((e) => {
    throw e;
  }
);
