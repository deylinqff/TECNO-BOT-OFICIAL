import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🌸 𝗬𝗮 𝘁𝗲 𝗲𝗻𝗰𝘂𝗲𝗻𝘁𝗿𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘀𝗲?\n\n𝗨𝘀𝗲 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`Eʟ ғᴏʀᴍᴀᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\nUsᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix + command} 𝗻𝗼𝗺𝗯𝗿𝗲.𝗲𝗱𝗮𝗱\nEᴊᴇᴍᴘʟᴏ : *${usedPrefix + command} ${name2}.14*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🚀 Eʟ ɴᴏᴍʙʀᴇ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪᴏ.')
  if (!age) return m.reply('⚡ Lᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ.')
  if (name.length >= 100) return m.reply('🚀 El nombre es demasiado largo.' )
  age = parseInt(age)
  if (age > 100) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
  if (age < 5) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  global.db.data.users[m.sender].money += 600
  global.db.data.users[m.sender].estrellas += 10
  global.db.data.users[m.sender].exp += 245
  global.db.data.users[m.sender].joincount += 5
  let sn = createHash('md5').update(m.sender).digest('hex')
let regbot = `⋨ 🚀 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 ⚡ ⋩\n`
regbot += `┳━━━━━━━━━━━━━┳\n`
regbot += `「🌐」Nσɱზɾҽ: ${name}\n`
regbot += `「🚀」Eԃαԃ: ${age} años\n`
regbot += `┳━━━━━━━━━━━━━┳\n`
regbot += `「⚡」Rҽƈσɱρҽɳʂαʂ:\n\n`
regbot += `「💠」15 Eʂƚɾҽʅʅαʂ 🌟\n`
regbot += `「⚡」5 IαɳCσιɳʂ 🪙\n`
regbot += `「🚀」245 Exρҽɾιҽɳƈια 💸\n`
regbot += `「🌐」12 Tσƙҽɳʂ 💰\n`
regbot += `┳━━━━━━━━━━━━━┳\n`
regbot += `${packname}`
await m.react('🚀')
await conn.sendLuffy(m.chat, '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰', textbot, regbot, imagen1, imagen1, channel, m)
}
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler