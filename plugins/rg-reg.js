import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  // Si ya está registrado
  if (user.registered === true) 
    return m.reply(`🧑‍💻 YA ESTÁS REGISTRADO.\n\n*¿QUIERES HACERLO DE NUEVO?*\n\nUSA ESTE COMANDO PARA ELIMINAR TU REGISTRO:\n*${usedPrefix}unreg* <Número de serie>`)

  // Validar formato
  if (!Reg.test(text)) 
    return m.reply(`🤖 FORMATO INCORRECTO.\n\nUSO DEL COMANDO: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.16*`)

  let [_, name, splitter, age] = text.match(Reg)

  // Validaciones adicionales
  if (!name) return m.reply('👻 EL NOMBRE NO PUEDE ESTAR VACÍO.')
  if (!age) return m.reply('👻 LA EDAD NO PUEDE ESTAR VACÍA.')
  if (name.length >= 100) return m.reply('🫥 EL NOMBRE ESTÁ MUY LARGO.')
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 WOW, EL ABUELO QUIERE JUGAR CON EL BOT.')
  if (age < 5) return m.reply('🚼 EL BEBÉ QUIERE JUGAR JAJA.')

  // Enviar reacción inicial 📨
  await m.react('📨')

  // Registrar usuario
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  // Generar número de serie
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch(`https://files.catbox.moe/wq12s1.jpg`)).buffer()

  // Mensaje de confirmación
  let txt = ` –  *R E G I S T R O  - T E C N O*\n\n`
  txt += `  🌐  *NOMBRE* : ${name}\n`
  txt += `  🚀  *EDAD* : ${age} años\n`
  
  // Enviar mensaje de registro
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)

  // Reacción final 📩
  await m.react('📩')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler