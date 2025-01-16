import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
let Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
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
//  'logo': 'MAKER',
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
}

const let MenuText = {
  before:  `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *gggッ𝑫𝒆𝒚𝒍𝒊𝒏ッ* soy *TECNO*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ 〘Cliente: 〘〙ッ𝑫𝒆𝒚𝒍𝒊𝒏ッ〘〙
║ ✎ 〘Exp: 11038
║ ✎ 〘Nivel: 0
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ 〘Bot: ©Tecno-Bot-Plus®
║ ✎ 〘Modo Público
║ ✎ 〘Baileys: Multi Device
║ ✎ 〘Tiempo Activo: --:--:--
║ ✎ 〘Usuarios: 1281 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
 ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
			⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_ 

*┏━━━━▣━━⌬〘 🧧 ANIME 🎐 〙*
┃✎›〘 .acosar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .llorar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .awoo @usuario
┃✎›〘 .besar @usuario
┃✎›〘 .lamer @usuario
┃✎›〘 .acariciar @usuario
┃✎›〘 .engreído @usuario
┃✎›〘 .golpear @usuario
┃✎›〘 .lanzar @usuario
┃✎›〘 .ruborizarse @usuario
┃✎›〘 .sonreír @usuario
┃✎›〘 .saludar @usuario
┃✎›〘 .chocar @usuario
┃✎›〘 .sostener @usuario
┃✎›〘 .morder @usuario
┃✎›〘 .glomp @usuario
┃✎›〘 .abofetear @usuario
┃✎›〘 .matar @usuario
┃✎›〘 .feliz @usuario
┃✎›〘 .guiñar @usuario
┃✎›〘 .tocar @usuario
┃✎›〘 .bailar @usuario
┃✎›〘 .cringe @usuario
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 ❗ INFO ❕ 〙*
┃✎›〘 .comprar
┃✎›〘 .staff
┃✎›〘 .grupos
┃✎›〘 .allmenu
┃✎›〘 .ping
┃✎›〘 .runtime
┃✎›〘 .script
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔎 SEARCH 🔍 〙*
┃✎›〘 .tiktoksearch <txt>
┃✎›〘 .google <pencarian>
┃✎›〘 .googlef <pencarian>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🕹️ GAME 🎮 〙*
┃✎›〘 .apostar *<cantidad>*
┃✎›〘 .mates
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 ⚙️ SUB BOTS 🤖 〙*
┃✎›〘 .bots
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🌐 RPG 🥇 〙*
┃✎›〘 .addprem [@user] <days>
┃✎›〘 .bank
┃✎›〘 .crimen
┃✎›〘 .dareris *@user <cantidad>*
┃✎›〘 .darxp *@user <cantidad>*
┃✎›〘 .minar
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎑 REGISTRO 🎟️ 〙*
┃✎›〘 .profile
┃✎›〘 .reg *<nombre.edad>*
┃✎›〘 .mysn
┃✎›〘 .unreg
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 💟 STICKER 🏷️ 〙*
┃✎›〘 .emojimix *<emoji+emoji>*
┃✎›〘 .pfp @user
┃✎›〘 .qc
┃✎›〘 .sticker
┃✎›〘 .toimg (reply)
┃✎›〘 .take *<nombre>|<autor>*
┃✎›〘 .tovid *<sticker>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🖼️ IMAGE 🎇 〙*
┃✎›〘 .pixiv *<búsqueda>*
┃✎›〘 .pinterest
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 👥 GROUPS 📢 〙*
┃✎›〘 .todos <mensaje>
┃✎›〘 .antibot *<on/off>*
┃✎›〘 .delete
┃✎›〘 .despertar
┃✎›〘 .fantasmas
┃✎›〘 .infogp
┃✎›〘 .promote *@user*
┃✎›〘 .resetlink
┃✎›〘 .group *abierto/cerrado*
┃✎›〘 .delete2
┃✎›〘 .otag
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎛️ ON / OFF 🔌 〙*
┃✎›〘 .enable
┃✎›〘 .disable
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 💎 PREMIUM 👑 〙*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 📥 DOWNLOAD 📤 〙*
┃✎›〘 Audio
┃✎›〘 Video
┃✎›〘 .playx *<enlace de YouTube>*
┃✎›〘 .tiktokrandom ◜⭐◞
┃✎›〘 .aptoide *<búsqueda>*
┃✎›〘 .danbooru *<url>*
┃✎›〘 .play
┃✎›〘 .soundcloud *<búsqueda>*
┃✎›〘 .tiktokuser *<usuario>*
┃✎›〘 .tiktokvid *<búsqueda>*
┃✎›〘 .pixiv *<búsqueda>*
┃✎›〘 .xnxxdl *<url>*
┃✎›〘 Video
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔧 TOOLS 🛠️ 〙*
┃✎›〘 .ssweb
┃✎›〘 .ss
┃✎›〘 .ver
┃✎›〘 .google <pencarian>
┃✎›〘 .googlef <pencarian>
┃✎›〘 .genearimg
┃✎›〘 .chatgpt <texto>
┃✎›〘 .ia2 <texto>
┃✎›〘 .removebg
┃✎›〘 .tovid *<sticker>*
┃✎›〘 .whatmusic <audio/video>
┃✎›〘 .vendo
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎉 FUN 🎊 〙*
┃✎›〘 .ship
┃✎›〘 .gay2 *@user*
┃✎›〘 .lesbiana *@user*
┃✎›〘 .pajero *@user*
┃✎›〘 .pajera *@user*
┃✎›〘 .puto *@user*
┃✎›〘 .puta *@user*
┃✎›〘 .manco *@user*
┃✎›〘 .manca *@user*
┃✎›〘 .rata *@user*
┃✎›〘 .prostituta *@user*
┃✎›〘 .prostituto *@user*
┃✎›〘 .follar
┃✎›〘 .formartrio
┃✎›〘 .marica
┃✎›〘 .personalidad *<nombre>*
┃✎›〘 .acosar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .llorar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .awoo @usuario
┃✎›〘 .besar @usuario
┃✎›〘 .lamer @usuario
┃✎›〘 .acariciar @usuario
┃✎›〘 .engreído @usuario
┃✎›〘 .golpear @usuario
┃✎›〘 .lanzar @usuario
┃✎›〘 .ruborizarse @usuario
┃✎›〘 .sonreír @usuario
┃✎›〘 .saludar @usuario
┃✎›〘 .chocar @usuario
┃✎›〘 .sostener @usuario
┃✎›〘 .morder @usuario
┃✎›〘 .glomp @usuario
┃✎›〘 .abofetear @usuario
┃✎›〘 .matar @usuario
┃✎›〘 .feliz @usuario
┃✎›〘 .guiñar @usuario
┃✎›〘 .tocar @usuario
┃✎›〘 .bailar @usuario
┃✎›〘 .cringe @usuario
┃✎›〘 .reto
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔞 NSFW 📛 〙*
┃✎›〘 .hentai
┃✎›〘 .genshin
┃✎›〘 .swimsuit
┃✎›〘 .schoolswimsuit
┃✎›〘 .white
┃✎›〘 .barefoot
┃✎›〘 .touhou
┃✎›〘 .gamecg
┃✎›〘 .hololive
┃✎›〘 .uncensored
┃✎›〘 .sunglasses
┃✎›〘 .glasses
┃✎›〘 .weapon
┃✎›〘 .shirtlift
┃✎›〘 .chain
┃✎›〘 .fingering
┃✎›〘 .flatchest
┃✎›〘 .torncloth
┃✎›〘 .bondage
┃✎›〘 .demon
┃✎›〘 .wet
┃✎›〘 .pantypull
┃✎›〘 .headdress
┃✎›〘 .headphone
┃✎›〘 .tie
┃✎›〘 .anusview
┃✎›〘 .shorts
┃✎›〘 .stokings
┃✎›〘 .topless
┃✎›〘 .beach
┃✎›〘 .bunnygirl
┃✎›〘 .bunnyear
┃✎›〘 .idol
┃✎›〘 .vampire
┃✎›〘 .gun
┃✎›〘 .maid
┃✎›〘 .bra
┃✎›〘 .nobra
┃✎›〘 .bikini
┃✎›〘 .whitehair
┃✎›〘 .blonde
┃✎›〘 .pinkhair
┃✎›〘 .bed
┃✎›〘 .ponytail
┃✎›〘 .nude
┃✎›〘 .dress
┃✎›〘 .underwear
┃✎›〘 .foxgirl
┃✎›〘 .uniform
┃✎›〘 .skirt
┃✎›〘 .sex
┃✎›〘 .sex2
┃✎›〘 .sex3
┃✎›〘 .breast
┃✎›〘 .twintail
┃✎›〘 .spreadpussy
┃✎›〘 .tears
┃✎›〘 .seethrough
┃✎›〘 .breasthold
┃✎›〘 .drunk
┃✎›〘 .fateseries
┃✎›〘 .spreadlegs
┃✎›〘 .openshirt
┃✎›〘 .headband
┃✎›〘 .food
┃✎›〘 .close
┃✎›〘 .tree
┃✎›〘 .nipples
┃✎›〘 .erectnipples
┃✎›〘 .horns
┃✎›〘 .greenhair
┃✎›〘 .wolfgirl
┃✎›〘 .catgirl
┃✎›〘 .r34 <texto>
┃✎›〘 .xnxxdl *<url>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🧮 DATABASE 🖥️ 〙*
┃✎›〘 .delcmd *<texto>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 👤 OWNER 👁️ 〙*
┃✎›〘 .enable
┃✎›〘 .disable
┃✎›〘 .banuser <@tag>
┃✎›〘 .addestrellas *<@user>*
┃✎›〘 .addprem [@user] <days>
┃✎›〘 .autoadmin
┃✎›〘 .dsowner
┃✎›〘 .getsesion
┃✎›〘 .restart
┃✎›〘 .savefile
┃✎›〘 .update
┃✎›〘 .actualizar
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 📣 AUDIOS 🔊 〙*
┃✎›〘 .bass *<mp3/vn>*
┃✎›〘 .blown *<mp3/vn>*
┃✎›〘 .deep *<mp3/vn>*
┃✎›〘 .earrape *<mp3/vn>*
┃✎›〘 .fast *<mp3/vn>*
┃✎›〘 .fat *<mp3/vn>*
┃✎›〘 .nightcore *<mp3/vn>*
┃✎›〘 .reverse *<mp3/vn>*
┃✎›〘 .robot *<mp3/vn>*
┃✎›〘 .slow *<mp3/vn>*
┃✎›〘 .smooth *<mp3/vn>*
┃✎›〘 .tupai *<mp3/vn>*
┃✎›〘 .reverb *<mp3/vn>*
┃✎›〘 .chorus *<mp3/vn>*
┃✎›〘 .flanger *<mp3/vn>*
┃✎›〘 .distortion *<mp3/vn>*
┃✎›〘 .pitch *<mp3/vn>*
┃✎›〘 .highpass *<mp3/vn>*
┃✎›〘 .lowpass *<mp3/vn>*
┃✎›〘 .underwater *<mp3/vn>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🗝️ ADVANCED 🎮 〙*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 enlace2 〙*
┃✎›〘 .link2
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 descargas 〙*
┃✎›〘 .spotify
┃✎›〘 .facebook2 ◜⭐◞
┃✎›〘 .fb2 ◜⭐◞
┃✎›〘 .instagram2
┃✎›〘 .ig2
┃✎›〘 .facebook ◜⭐◞
┃✎›〘 .fb ◜⭐◞
┃✎›〘 .mediafire <url>
┃✎›〘 .pinterest
┃✎›〘 .play3
┃✎›〘 .play4
┃✎›〘 .tiktok *<link>* ◜⭐◞
┃✎›〘 .imagen <query>
┃✎›〘 .play2 <formato> <búsqueda>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 mods 〙*
┃✎›〘 .banchat
┃✎›〘 .unbanchat
┃✎›〘 .unbanuser <@tag>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 grupo 〙*
┃✎›〘 .kick
┃✎›〘 .group abrir / cerrar
┃✎›〘 .add
┃✎›〘 .tag <mensaje>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 info 〙*
┃✎›〘 .ds
┃✎›〘 .fixmsgespera
┃✎›〘 .creador
┃✎›〘 .owner
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 fix 〙*
┃✎›〘 .dsowner
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 buscador 〙*
┃✎›〘 .imagen <query>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 jadibot 〙*
┃✎›〘 .code
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 convertir 〙*
┃✎›〘 .toibb
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 transformador 〙*
┃✎›〘 .tourl2
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
©  *TECNO BOT - Desarrollado por DEYLIN*`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
     let tag = `@${m.sender.split("@")[0]}`
    let mode = global.opts["self"] ? "Privado" : "Publico"
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
   let replace = {
 "%": "%",
 p: _p,
 uptime,
 muptime,
 me: conn.getName(conn.user.jid),
 npmname: _package.name,
 npmdesc: _package.description,
 version: _package.version,
 exp: exp - min,
 maxexp: xp,
 totalexp: exp,
 xp4levelup: max - exp,
 github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
 mode,
 _p,
 tag,
 name,
 level,
 limit,
 name,
 totalreg,
 readmore: readMore
   }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let pp = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp2 = 'https://i.ibb.co/9WrytGt/file.jpg'
    let pp3 = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp4 = 'https://i.ibb.co/9WrytGt/file.jpg'
    let pp5 = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp6 = 'https://i.ibb.co/9WrytGt/file.jpg'
    let pp7 = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp8 = 'https://i.ibb.co/9WrytGt/file.jpg'
    let pp9 = 'https://i.ibb.co/JmcS3kv/Sylph.jpg'
    let pp10 = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp11 = 'https://i.ibb.co/JmcS3kv/Sylph.jpg'
    let pp12 = 'https://i.ibb.co/CPVcnqH/file.jpg'
    let pp13 = 'https://i.ibb.co/Cs6Tt9V/Sylph.jpg'
    let pp14 = 'https://i.ibb.co/JmcS3kv/Sylph.jpg'
    let pp15 = 'https://i.ibb.co/Cs6Tt9V/Sylph.jpg'
    let img = 'https://files.catbox.moe/pz9ba0.jpg'
    await m.react('🚀')
   // await caption: MenuText(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)
   //await conn.sendAi(m.chat, botname, textbot, text.trim(), img, img, canal, estilo)

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'una linda noche 🌙'; break;
  case 1: hour = 'una linda noche 💤'; break;
  case 2: hour = 'una linda noche 🦉'; break;
  case 3: hour = 'una linda mañana ✨'; break;
  case 4: hour = 'una linda mañana 💫'; break;
  case 5: hour = 'una linda mañana 🌅'; break;
  case 6: hour = 'una linda mañana 🌄'; break;
  case 7: hour = 'una linda mañana 🌅'; break;
  case 8: hour = 'una linda mañana 💫'; break;
  case 9: hour = 'una linda mañana ✨'; break;
  case 10: hour = 'un lindo dia 🌞'; break;
  case 11: hour = 'un lindo dia 🌨'; break;
  case 12: hour = 'un lindo dia ❄'; break;
  case 13: hour = 'un lindo dia 🌤'; break;
  case 14: hour = 'una linda tarde 🌇'; break;
  case 15: hour = 'una linda tarde 🥀'; break;
  case 16: hour = 'una linda tarde 🌹'; break;
  case 17: hour = 'una linda tarde 🌆'; break;
  case 18: hour = 'una linda noche 🌙'; break;
  case 19: hour = 'una linda noche 🌃'; break;
  case 20: hour = 'una linda noche 🌌'; break;
  case 21: hour = 'una linda noche 🌃'; break;
  case 22: hour = 'una linda noche 🌙'; break;
  case 23: hour = 'una linda noche 🌃'; break;
}
  var greeting = "espero que tengas " + hour;