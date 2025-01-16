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

const defaultMenu = {
  before:  `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

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
   // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
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

