// Código creado por Deyin
// TECNO-BOT ©®

import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile, readdirSync } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

// Mensajes iniciales
console.log(chalk.blueBright('\n✰ Iniciando TECNO ✰'));

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('TECNO\nBOT', {
  font: 'block',
  align: 'center',
  colors: ['white'],
});
say(`Multi Device`, {
  font: 'chrome',
  align: 'center',
  colors: ['red'],
});
say(`Developed By • Deylin`, {
  font: 'console',
  align: 'center',
  colors: ['magenta'],
});

// Cargar comandos desde la carpeta 'commands/'
const commands = new Map();
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(join(commandsPath, file));
  commands.set(command.name, command);
  console.log(`Comando cargado: ${command.name}`);
}

let isRunning = false;

// Función principal para iniciar el bot
function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['green'],
  });

  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });

  let p = fork();

  p.on('message', async (data) => {
    switch (data.command) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'executeCommand': {
        const { commandName, message } = data;
        const command = commands.get(commandName);
        if (command) {
          try {
            await command.execute(message);
          } catch (err) {
            console.error('Error ejecutando el comando:', err);
          }
        }
        break;
      }
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error(chalk.red('🚩 Error:\n'), code);
    process.exit();
    if (code === 0) return;

    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', line => {
        p.emit('message', { command: 'executeCommand', commandName: line.trim() });
      });
    }
  }
}

// Manejo de advertencias
process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn(chalk.yellow('🚩 Se excedió el límite de Listeners en:'));
    console.warn(warning.stack);
  }
});

// Inicia el bot
start('start.js');