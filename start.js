process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';

import './config.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import fs, { existsSync, readdirSync, statSync, unlinkSync } from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from '@whiskeysockets/baileys';
import readline from 'readline';
import NodeCache from 'node-cache';

// Variables globales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

global.opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
global.prefix = new RegExp(`^[${opts.prefix || '*/!#$%&'}]`);
global.db = new Low(new JSONFile('database.json'));
global.conn = null;
global.conns = [];
global.plugins = {};
global.reload = true;

// Función para cargar la base de datos
async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(resolve =>
      setInterval(async () => {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(global.db.data || await loadDatabase());
        }
      }, 1000)
    );
  }
  if (global.db.data !== null) return;

  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...global.db.data,
  };
}
await loadDatabase();

// Configuración para conexión con Baileys
const { state, saveState } = await useMultiFileAuthState('TecnoSession');
const { version } = await fetchLatestBaileysVersion();
const connectionOptions = {
  logger: Pino({ level: 'silent' }),
  auth: state,
  version,
};

global.conn = makeWASocket(connectionOptions);

// Manejo de eventos de conexión
global.conn.ev.on('connection.update', async update => {
  const { connection, lastDisconnect } = update;
  if (connection === 'close') {
    const reason = new Boom(lastDisconnect.error)?.output?.statusCode;
    if (reason === DisconnectReason.badSession) {
      console.log(chalk.red('Sesión inválida. Eliminando credenciales.'));
      unlinkSync('./TecnoSession'); // Elimina la sesión actual
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.yellow('Conexión cerrada. Reconectando...'));
      await connectMainBot();
    } else {
      console.error(chalk.red(`Desconexión inesperada: ${reason}`));
    }
  } else if (connection === 'open') {
    console.log(chalk.green('Conexión exitosa.'));
  }
});

// Recarga automática de plugins
function watchPlugins() {
  const pluginFolder = './plugins/';
  if (!existsSync(pluginFolder)) fs.mkdirSync(pluginFolder);

  fs.watch(pluginFolder, (eventType, filename) => {
    if (filename && /\.js$/.test(filename)) {
      const filePath = join(pluginFolder, filename);
      if (eventType === 'change' || eventType === 'rename') {
        delete require.cache[require.resolve(filePath)];
        try {
          const plugin = require(filePath);
          global.plugins[filename] = plugin;
          console.log(chalk.blue(`Plugin ${filename} recargado con éxito.`));
        } catch (e) {
          console.error(chalk.red(`Error al recargar el plugin ${filename}: ${e}`));
        }
      }
    }
  });
}
watchPlugins();

// Conexión de sub-bots
async function connectSubBots() {
  const subBotDirectory = './YukiJadiBot';
  if (!existsSync(subBotDirectory)) {
    console.log('No se encontraron sub-bots vinculados.');
    return;
  }

  const subBotFolders = readdirSync(subBotDirectory).filter(file =>
    statSync(join(subBotDirectory, file)).isDirectory()
  );

  for (const folder of subBotFolders) {
    const authFile = join(subBotDirectory, folder, 'creds.json');
    if (existsSync(authFile)) {
      const subConn = makeWASocket({ ...connectionOptions, auth: await useMultiFileAuthState(authFile) });
      global.conns.push(subConn);

      subConn.ev.on('connection.update', update => {
        const { connection } = update;
        if (connection === 'open') {
          console.log(chalk.green(`Sub-bot conectado desde la carpeta: ${folder}`));
        }
      });
    }
  }
}
await connectSubBots();

// Manejo de comandos desde consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', line => {
  if (line === 'reload') {
    console.log(chalk.yellow('Recargando todos los plugins...'));
    Object.keys(global.plugins).forEach(pluginName => {
      const pluginPath = join('./plugins/', pluginName);
      delete require.cache[require.resolve(pluginPath)];
      try {
        const plugin = require(pluginPath);
        global.plugins[pluginName] = plugin;
        console.log(chalk.blue(`Plugin ${pluginName} recargado con éxito.`));
      } catch (e) {
        console.error(chalk.red(`Error al recargar el plugin ${pluginName}: ${e}`));
      }
    });
  }
});

console.log(chalk.blue(`Servidor corriendo en el puerto ${PORT}`));