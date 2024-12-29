import { createHash } from 'crypto'
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
  if (!name || !age) 
    return m.reply('👻 EL NOMBRE Y LA EDAD SON OBLIGATORIOS.')
  if (name.length >= 100) 
    return m.reply('🫥 EL NOMBRE ESTÁ MUY LARGO.')
  
  age = parseInt(age)
  if (age > 100) 
    return m.reply('👴🏻 WOW, EL ABUELO QUIERE JUGAR CON EL BOT.')
  if (age < 5) 
    return m.reply('🚼 EL BEBÉ QUIERE JUGAR JAJA.')

  // Reacción inicial 📨
  await m.react('📨')

  // Registrar usuario
  user.name = name.trim()
  user.age = age
  user.regTime = Date.now()
  user.registered = true

  // Mensaje de confirmación
  let sn = createHash('md5').update(m.sender).digest('hex')
  let imgURL = 'https://files.catbox.moe/wq12s1.jpg'
  let txt = ` –  *R E G I S T R O  - T E C N O*\n\n`
  txt += `  🌐  *NOMBRE* : ${name}\n`
  txt += `  🚀  *EDAD* : ${age} años\n`

  // Enviar mensaje y reaccionar al final
  await conn.sendAi(m.chat, botname, textbot, txt, imgURL, imgURL, canal, m)
  await m.react('📩')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler