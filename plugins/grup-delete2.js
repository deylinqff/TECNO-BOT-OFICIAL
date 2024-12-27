let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) return conn.reply(m.chat, `🚩 Responde al mensaje del usuario cuyo último contenido deseas eliminar.`, m);

  try {
    const user = m.quoted.sender || m.quoted.participant; // Obtener el participante
    const messages = await conn.loadMessage(m.chat, { limit: 50 }); // Cargar últimos 50 mensajes
    const userMessages = messages.filter(msg => msg.sender === user).slice(-5); // Filtrar los 5 últimos mensajes del usuario

    if (userMessages.length === 0) return conn.reply(m.chat, `🚩 No se encontraron mensajes recientes de este usuario.`, m);

    // Eliminar los mensajes uno por uno
    for (const msg of userMessages) {
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: msg.key.id, participant: msg.sender } });
    }
    conn.reply(m.chat, `✅ Se eliminaron los últimos ${userMessages.length} mensajes del usuario.`, m);
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, `❌ Ocurrió un error al intentar eliminar los mensajes.`, m);
  }
};

handler.help = ['delete2']
handler.tags = ['group']
handler.command = /^delete2$/i // Cambiado para que solo se active con .delete2
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler;