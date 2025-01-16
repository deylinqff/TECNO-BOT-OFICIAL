import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const defaultMenu = {
  before: `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name* soy *TECNO*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ 〘Cliente: %name
║ ✎ 〘Exp: %exp
║ ✎ 〘Nivel: %level
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ 〘Bot: ©Tecno-Bot-Plus®
║ ✎ 〘Modo Público
║ ✎ 〘Baileys: Multi Device
║ ✎ 〘Tiempo Activo: %muptime
║ ✎ 〘Usuarios: %totalreg 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
%readmore
\t\t\t⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_ 
`.trimStart(),
  header: '*┏━━━━▣━━⌬〘 %category 〙*',
  body: '┃✎›〘 %cmd %islimit %isPremium\n',
  footer: '*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*',
  after: `© ${textbot}`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`;
    let mode = global.opts["self"] ? "Privado" : "Público";
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(() => ({}))) || {};
    let { exp, limit, level } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = 'es';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    let _uptime = process.uptime() * 1000;
    let muptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;

    let replace = {
      "%": "%",
      p: _p,
      uptime: muptime,
      name,
      exp,
      level,
      limit,
      totalreg,
      mode,
      readmore: readMore,
    };

    let text = defaultMenu.before.replace(/%(\w+)/g, (_, name) => replace[name] || '');
    text += defaultMenu.after;

    // URLs para imágenes
    const imageUrls = [
      'https://i.ibb.co/CPVcnqH/file.jpg',
      'https://i.ibb.co/9WrytGt/file.jpg',
      'https://i.ibb.co/JmcS3kv/Sylph.jpg',
    ];

    // Selecciona una imagen aleatoria
    const selectedImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    // Enviar mensaje con imagen aleatoria
    await conn.sendFile(m.chat, selectedImage, 'menu.jpg', text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
    throw e;
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'];
handler.register = true;
export default handler;

const readMore = String.fromCharCode(8206).repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}