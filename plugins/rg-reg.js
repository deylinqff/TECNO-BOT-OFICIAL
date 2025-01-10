import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  // Verificar si el usuario ya está registrado
  if (user.registered === true) return m.reply(`🧑‍💻 YA ESTÁS REGISTRADO.\n\n*¿QUIERES HACERLO DE NUEVO?*\n\nUSA ESTE COMANDO PARA ELIMINAR TU REGISTRO:\n*${usedPrefix}unreg* `)

  // Automatizar registro si el usuario se unió al canal
  if (m.isGroup && m.action === 'join' && m.chat.includes('0029VawF8fBBvvsktcInIz3m')) {
    user.name = name2 || 'Usuario'
    user.age = 18 // Edad predeterminada
    user.regTime = +new Date()
    user.registered = true

    let sn = createHash('md5').update(m.sender).digest('hex')
    let img = await (await fetch(`https://files.catbox.moe/g95ury.jpg`)).buffer()
    let txt = `🎉 *REGISTRO AUTOMÁTICO COMPLETADO*\n\n`
        txt += `╔  🚀  *NOMBRE* : ${user.name}\n`
        txt += `╠  ⚡  *EDAD* : ${user.age} años (predeterminada)\n`
        txt += `╚  ✎ Gracias por unirte al canal. ¡Disfruta del Bot! 🎉\n`
    await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
    return m.react('✅')
  }

  // Respuesta si no está en el canal
  return m.reply(`🤖 ÚNETE AL CANAL PARA REGISTRARTE AUTOMÁTICAMENTE:\nhttps://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m`)
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler