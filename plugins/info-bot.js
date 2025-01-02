import ws from 'ws';

async function handler(m, { conn: stars, usedPrefix }) {
  try {
    // Verificar si global.conns existe y es un array
    if (!global.conns || !Array.isArray(global.conns)) global.conns = [];

    // Mapear usuarios únicos
    let uniqueUsers = new Map();
    global.conns.forEach((conn) => {
      if (conn.user && conn.ws && conn.ws.readyState !== ws.CLOSED) {
        uniqueUsers.set(conn.user.jid, conn);
      }
    });

    let users = [...uniqueUsers.values()];

    // Crear mensaje con la lista de sub-bots
    let message = users.map((v, index) => {
      return `╭─⬣「 ${packname || 'BOT'} 」⬣\n` +
        `│⁖ฺ۟̇࣪·֗٬̤⃟💛 *${index + 1}.-* @${v.user.jid.replace(/[^0-9]/g, '')}\n` +
        `│❀ *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}\n` +
        `│❀ *Nombre:* ${v.user.name || '𝚂𝚄𝙱-𝙱𝙾𝚃'}\n` +
        `╰─⬣`;
    }).join('\n\n');

    let totalUsers = users.length;
    let responseMessage = `╭━〔 𝗦𝗨𝗕-𝗕𝗢𝗧𝗦 𝗝𝗔𝗗𝗜𝗕𝗢𝗧 🌠 〕⬣\n` +
      `┃ *𝚃𝙾𝚃𝙰𝙻 𝙳𝙴 𝚂𝚄𝙱𝙱𝙾𝗧𝗦:* ${totalUsers || '0'}\n` +
      `╰━━━━━━━━━━━━⬣\n\n${message.trim() || 'No hay sub-bots activos.'}`.trim();

    // Enviar el mensaje
    await stars.sendMessage(m.chat, {
      text: responseMessage,
      mentions: stars.parseMention(responseMessage)
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await stars.sendMessage(m.chat, {
      text: '⚠️ Ocurrió un error al obtener la lista de sub-bots. Inténtalo de nuevo más tarde.',
    }, { quoted: m });
  }
}

handler.command = ['listjadibot', 'bots'];
handler.help = ['bots'];
handler.tags = ['jadibot'];
export default handler;