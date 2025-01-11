// Código creado por Deyin
// TECNO-BOT ©®

// Importaciones necesarias
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

// Mensaje de inicio
console.log(chalk.blueBright('\n✰ Iniciando TECNO ✰'));

// Definición de variables de entorno
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));

// Configuración gráfica de inicio
const { say } = cfonts;
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

// Inicialización del bot
let isRunning = false;
function start(file) {
  if (isRunning) return;
  isRunning = true;

  // Configuración del archivo principal y argumentos
  const args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['green'],
  });

  // Configuración de procesos maestro e hijo
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });

  const processChild = fork();

  // Manejo de mensajes desde el proceso hijo
  processChild.on('message', (data) => {
    switch (data) {
      case 'reset':
        processChild.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        processChild.send(process.uptime());
        break;
    }
  });

  // Manejo de salida del proceso hijo
  processChild.on('exit', (code) => {
    isRunning = false;
    console.error(chalk.red('🚩 Error:\n'), code);
    if (code === 0) return;

    // Reiniciar automáticamente en caso de cambios en el archivo
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  // Configuración de línea de comandos interactiva
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    const rl = createInterface(process.stdin, process.stdout);
    if (!rl.listenerCount()) {
      rl.on('line', (line) => {
        processChild.emit('message', line.trim());
      });
    }
  }
}

// Manejo de advertencias de Node.js
process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn(chalk.yellow('🚩 Se excedió el límite de Listeners en:'));
    console.warn(warning.stack);
  }
});

// Iniciar el bot
start('start.js');