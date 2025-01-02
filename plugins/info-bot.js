async function handler(m, { conn: stars, usedPrefix }) {
  try {
    if (!global.conns || !Array.isArray(global.conns)) global.conns = [];

    console.log('Conexiones iniciales:', global.conns);

    let uniqueUsers = new Map();
    global.conns.forEach((conn) => {
      if (conn.user && conn.ws && conn.ws.readyState !== ws.CLOSED) {
        uniqueUsers.set(conn.user.jid, conn);
      }
    });

    console.log('Usuarios únicos:', [...uniqueUsers.values()]);

    let users = [...uniqueUsers.values()];

    let message = users.map((v, index) => {
      return `╭─⬣「 BOT 」⬣\n` +
        `│ *${index + 1}.-* @${v.user.jid.replace(/[^0-9]/g, '')}\n` +
        `│ *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}\n` +
        `│ *Nombre:* ${v.user.name || 'SUB-BOT'}\n` +
        `╰─⬣`;
    }).join('\n\n');

    let responseMessage = `╭━〔 SUB-BOTS 〕⬣\n` +
      `┃ *Total:* ${users.length || '0'}\n` +
      `╰━━━━━━━━━━━━⬣\n\n${message.trim() || 'No hay sub-bots activos.'}`;

    await stars.sendMessage(m.chat, {
      text: responseMessage,
      mentions: stars.parseMention(responseMessage)
    }, { quoted: m });

  } catch (error) {
    console.error('Error:', error);
    await stars.sendMessage(m.chat, {
      text: '⚠️ Ocurrió un error al obtener la lista de sub-bots.',
    }, { quoted: m });
  }
}