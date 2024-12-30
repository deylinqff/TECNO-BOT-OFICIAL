const { fetchLatestBaileysVersion, useMultiFileAuthState, DisconnectReason } = await import('@whiskeysockets/baileys');
import fs from 'fs';
import pino from 'pino';
import crypto from 'crypto';
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}

const codes = {}; // Para almacenar los códigos generados temporalmente.

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let parentw = args[0] && args[0] === "plz" ? conn : await global.conn;

  if (!(args[0] && args[0] === 'plz' || (await global.conn).user.jid === conn.user.jid)) {
    return m.reply("Este comando solo puede ser usado en el bot principal! wa.me/" + global.conn.user.jid.split`@`[0x0] + "?text=" + usedPrefix + "serbot");
  }

  async function serbot() {
    let serbotFolder = m.sender.split('@')[0];
    let folderSub = `./serbot/${serbotFolder}`;
    if (!fs.existsSync(folderSub)) {
      fs.mkdirSync(folderSub, { recursive: true });
    }
    if (args[0]) {
      fs.writeFileSync(`${folderSub}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'));
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderSub);
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      version,
      keepAliveIntervalMs: 30000,
      logger: pino({ level: "fatal" }),
      auth: state,
      browser: [`【 ✯ Ai Hoshino - MD ✰ 】`, "IOS", "4.1.0"],
    };

    let conn = makeWASocket(connectionOptions);

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update;

      if (isNewLogin) {
        conn.isInit = true;

        // Generar un código de 8 dígitos.
        const code = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 8);
        codes[code] = { conn, folderSub, timestamp: Date.now() };

        // Enviar el código al usuario.
        let txt = '`–  S E R B O T  -  S U B B O T`\n\n';
        txt += `┌ ✩  *Conecta este Sub Bot usando el código*\n`;
        txt += `│ ✩  Código: *${code}*\n`;
        txt += `└ ✩  *Nota:* Este código expira en 5 minutos.`;

        await parentw.reply(m.chat, txt, m);

        // Limpiar el código después de 5 minutos.
        setTimeout(() => {
          delete codes[code];
        }, 300000);
      }

      if (connection === "open") {
        global.conns.push(conn);
        await parentw.reply(m.chat, 'Conectado exitosamente.', m);
      }
    }

    conn.ev.on("connection.update", connectionUpdate);

    setTimeout(() => {
      if (!conn.user) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
        fs.rmdirSync(folderSub, { recursive: true });
      }
    }, 30000);
  }

  serbot();
};

handler.verifyCode = async (code, m) => {
  if (codes[code]) {
    const { conn, folderSub } = codes[code];
    delete codes[code]; // Eliminar el código tras su uso.

    conn.ev.on('connection.update', async (update) => {
      if (update.connection === 'open') {
        await conn.reply(m.chat, 'Sub Bot vinculado exitosamente.', m);
      }
    });

    return conn;
  } else {
    return null;
  }
};

handler.help = ["serbot"];
handler.tags = ["serbot"];
handler.command = ['serbot', 'qrbot', 'jadibot', 'qr'];

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}