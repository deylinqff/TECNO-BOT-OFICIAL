import { createHash } from 'crypto'
import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  // Verificar si el usuario ya está registrado
  if (user.registered === true) {
    return m.reply(`🧑‍💻 YA ESTÁS REGISTRADO.\n\n*¿QUIERES HACERLO DE NUEVO?*\n\nUSA ESTE COMANDO PARA ELIMINAR TU REGISTRO:\n*${usedPrefix}unreg* `)
  }

  // Verificar si el usuario no está registrado y no está en el canal
  if (!user.registered) {
    let channelLink = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m' // Enlace del canal

    // Mensaje solicitando unirse al canal
    return m.reply(`🤖 PARA USAR EL BOT, ÚNETE A NUESTRO CANAL:\n${channelLink}\n\n*Al unirte, tu registro será automático.*\n¡Gracias por tu apoyo! 🎉`)
  }
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler