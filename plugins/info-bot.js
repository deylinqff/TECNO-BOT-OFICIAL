import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
  // Asegúrate de que global.conns esté correctamente inicializado
  if (!global.conns || !Array.isArray(global.conns)) {
    global.conns = []  // Inicializa si no existe
  }

  let uniqueUsers = new Map()

  // Recorremos las conexiones para obtener las únicas
  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]

  // Generamos el mensaje para enviar
  let message = users.map((v, index) => `╭─⬣「 ${packname || '𝗣𝗔𝗖𝗞𝗡𝗔𝗠𝗘'} 」⬣\n│⁖ฺ۟̇࣪·֗٬̤⃟🌸 *${index + 1}.-* @${v.user.jid.replace(/[^0-9]/g, '')}\n│❀ *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}\n│❀ *Nombre:* ${v.user.name || '𝚂𝚄𝙱-𝙱𝙾𝚃'}\n╰─⬣`).join('\n\n')

  let replyMessage = message.length === 0 ? 'No hay bots disponibles' : message
  global.totalUsers = users.length

  let responseMessage = `╭━〔 𝗦𝗨𝗕-𝗕𝗢𝗧𝗦 𝗝𝗔𝗗𝗜𝗕𝗢𝗧 🤍 〕⬣\n┃ *𝚃𝙾𝚃𝙰𝙻 𝙳𝙴 𝚂𝚄𝙱𝙱𝙾𝚃𝚂* : ${global.totalUsers || '0'}\n╰━━━━━━━━━━━━⬣\n\n${replyMessage.trim()}`.trim()

  // Aseguramos que stars esté bien configurado para enviar el mensaje
  if (stars && stars.sendMessage) {
    await stars.sendMessage(m.chat, { text: responseMessage, mentions: stars.parseMention(responseMessage) }, { quoted: m })
  } else {
    console.error("Error: stars.sendMessage no está disponible.")
  }
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']

export default handler