import { fetchLatestBaileysVersion, useMultiFileAuthState } from '@whiskeysockets/baileys';
import fs from 'fs';
import pino from 'pino';
import crypto from 'crypto';
import { makeWASocket } from '../lib/simple.js';

if (!Array.isArray(global.conns)) {
  global.conns = [];
}

const codes = {}; // Para almacenar los códigos generados temporalmente.

let handler = async (m, { conn, args, usedPrefix }) => {
  let parentConn = args[0] === "plz" ? conn : global.conn;

  if (!parentConn || parentConn.user.jid !== conn.user.jid) {
    return m.reply(
      `Este comando solo puede ser usado en el bot principal! \n\nLink: wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}serbot`
    );
  }

  async function createSubBot() {
    let subBotFolder = `./serbot/${m.sender.split('@')[0]}`;
    if (!fs.existsSync(subBotFolder)) {
      fs.mkdirSync(subBotFolder, { recursive: true });
    }
    if (args[1]) {
      fs.writeFileSync(`${subBotFolder}/creds.json`, Buffer.from(args[1], 'base64').toString('utf-8'));
    }

    const { state, saveCreds } = await useMultiFileAuthState(subBotFolder);
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      version,
      logger: pino({ level: "silent" }),
      auth: state,
      browser: ["Sub Bot - MD", "Desktop", "3.0.0"],
    };

    const conn = makeWASocket(connectionOptions);

    conn.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, isNewLogin } = update;

      if (isNewLogin) {
        // Generar un código único de 8 caracteres
        const code = crypto.randomBytes(4).toString('hex').toUpperCase();
        codes[code] = { conn, folder: subBotFolder, timestamp: Date.now() };

        // Notificar al usuario
        const msg = `*Sub Bot - Vinculación*\n\n` +
          `✅ Código generado con éxito:\n` +
          `*${code}*\n\n` +
          `_Nota: Este código expira en 5 minutos._`;

        await parentConn.reply(m.chat, msg, m);

        // Limpiar el código tras 5 minutos
        setTimeout(() => {
          delete codes[code];
        }, 300000);
      }

      if (connection === "open") {
        global.conns.push(conn);
        await parentConn.reply(m.chat, "✅ Sub Bot conectado con éxito.", m);
      } else if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode || "Desconocido";
        await parentConn.reply(m.chat, `❌ Sub Bot desconectado. Razón: ${reason}`, m);

        // Eliminar archivos temporales
        fs.rmSync(subBotFolder, { recursive: true, force: true });
      }
    });

    setTimeout(() => {
      if (!conn.user) {
        try {
          conn.ws.close();
        } catch { }
        conn.ev.removeAllListeners();
        const index = global.conns.indexOf(conn);
        if (index >= 0) global.conns.splice(index, 1);

        fs.rmSync(subBotFolder, { recursive: true, force: true });
      }
    }, 30000);
  }

  createSubBot();
};

handler.verifyCode = async (code, m) => {
  if (codes[code]) {
    const { conn } = codes[code];
    delete codes[code]; // Código ya utilizado

    conn.ev.on("connection.update", async (update) => {
      if (update.connection === "open") {
        await conn.reply(m.chat, "✅ Sub Bot vinculado con éxito.", m);
      }
    });

    return conn;
  } else {
    return null;
  }
};

handler.help = ["serbot"];
handler.tags = ["tools"];
handler.command = ["serbot", "jadibot"];

export default handler;