import { promises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let tags = {
  'anime': '🧧 ANIME 🎐',
  'main': '❗ INFO ❕',
  'search': '🔎 SEARCH 🔍',
  'game': '🕹️ GAME 🎮',
  'serbot': '⚙️ SUB BOTS 🤖',
  'rpg': '🌐 RPG 🥇',
  'rg': '🎑 REGISTRO 🎟️',
  'sticker': '💟 STICKER 🏷️',
  'img': '🖼️ IMAGE 🎇',
  'group': '👥 GROUPS 📢',
  'nable': '🎛️ ON / OFF 🔌', 
  'premium': '💎 PREMIUM 👑',
  'downloader': '📥 DOWNLOAD 📤',
  'tools': '🔧 TOOLS 🛠️',
  'fun': '🎉 FUN 🎊',
  'nsfw': '🔞 NSFW 📛', 
  'cmd': '🧮 DATABASE 🖥️',
  'owner': '👤 OWNER 👁️', 
  'audio': '📣 AUDIOS 🔊', 
  'advanced': '🗝️ ADVANCED 🎮',
};

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
  after: `© Tecno-Bot-Plus`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`;
    let { exp, level } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let totalreg = Object.keys(global.db.data.users).length;
    let muptime = process.uptime();

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }));

    let before = defaultMenu.before;
    let header = defaultMenu.header;
    let body = defaultMenu.body;
    let footer = defaultMenu.footer;
    let after = defaultMenu.after;

    let text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help
            .filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
            .map(menu =>
              menu.help
                .map(help =>
                  body
                    .replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                    .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                    .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                    .trim()
                )
                .join('\n')
            ),
          footer,
        ].join('\n');
      }),
      after,
    ].join('\n');

    text = text.replace(
      /%(\w+)/g,
      (_, name) => ({ p: _p, tag, name, exp, level, muptime, totalreg }[name] || `%${name}`)
    );

    let images = [
      'https://i.ibb.co/CPVcnqH/file.jpg',
      'https://i.ibb.co/9WrytGt/file.jpg',
      'https://i.ibb.co/JmcS3kv/Sylph.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    await conn.sendFile(m.chat, randomImage, 'thumbnail.jpg', text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
    console.error(e);
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'];
handler.register = true;
export default handler;