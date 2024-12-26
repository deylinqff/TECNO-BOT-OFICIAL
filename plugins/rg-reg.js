import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`⚡ *STATUS: YA REGISTRADO* ⚡\n\n➡️ ¿Deseas reiniciar tu registro?\n🔄 Usa el comando:\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`❌ *ERROR: FORMATO INCORRECTO* ❌\n\n🧑‍💻 *Uso del comando:*\n${usedPrefix + command} <nombre.edad>\n📌 Ejemplo:\n${usedPrefix + command} ${name2}.16`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('⚠️ *ERROR: El nombre no puede estar vacío.*')
  if (!age) return m.reply('⚠️ *ERROR: La edad no puede estar vacía.*')
  if (name.length >= 100) return m.reply('⛔ *ERROR: El nombre es demasiado largo.*')
  age = parseInt(age)
  if (age > 100) return m.reply('👴 *¡Asombroso! Parece que un sabio quiere unirse al sistema.*')
  if (age < 5) return m.reply('👶 *¡Wow! ¿Un prodigio quiere entrar?*')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let img = await (await fetch(`https://files.catbox.moe/g1mo90.jpg`)).buffer()
  let txt = `⚙️ –  *[ R E G I S T R O  -  C R O W ]*  – ⚙️\n\n`
      txt += `🔹 *NOMBRE:* ${name}\n`
      txt += `🔹 *EDAD:* ${age} años\n`
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
  await m.react('✅')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler