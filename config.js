import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
dotenv.config();

let PORTconfigYargs;
let MODserver;
yargs(hideBin(process.argv))
  .command(
    "port <port> modo <modo>",
    "Configurar puerto para el servidor web",
    () => {},
    (argv) => {
      PORTconfigYargs = argv.port;
      MODserver = argv.modo;
    }
  )
  .command(
    "$0",
    "Puerto default port=8080, servidor modo=fork",
    () => {},
    (argv) => {
      PORTconfigYargs = 8080;
      MODserver = "fork";
    }
  )
  .demandCommand()
  .parse();

export default {
  app: {
    persistence: process.env.MOD_PERSISTENCE,
  },
  mongo: {
    url: process.env.MONGO_URI,
  },
  yargs: {
    port: PORTconfigYargs,
    server: MODserver,
  },
  session: {
    url: process.env.MONGO_URI,
    key: process.env.MONGO_STORE_KEY,
    secret: process.env.MONGO_STORE_SECRET,
  },
};
