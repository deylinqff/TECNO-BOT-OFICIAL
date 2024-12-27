let handler = async (m, { conn, text, args, participants }) => {
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return conn.reply(m.chat, `🚩 Etiqueta a un usuario para eliminar sus últimos 10 mensajes.`, m);
  }

  const target = m.mentionedJid[0].includes('@s.whatsapp.net') 
    ? m.mentionedJid[0] 
    : `${m.mentionedJid[0]}@s.whatsapp.net`;
  const chat = m.chat;

  try {
    const messages = await conn.fetchMessages(chat, 50); // Carga los últimos 50 mensajes
    const targetMessages = messages
      .filter((msg) => msg.key.participant === target || msg.key.remoteJid === target)
      .slice(0, 10); // Filtra los mensajes del usuario etiquetado y limita a 10

    if (targetMessages.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron mensajes recientes del usuario etiquetado.`, m);
    }

    for (const msg of targetMessages) {
      await conn.sendMessage(chat, { delete: msg.key });
    }

    conn.reply(m.chat, `✅ Se eliminaron ${targetMessages.length} mensajes de la persona etiquetada.`, m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Hubo un error al intentar eliminar los mensajes: ${e.message}`, m);
  }
};

handler.help = ['delete2'];
handler.tags = ['group'];
handler.command = /^delete2$/i;
handler.group = true; // Solo se puede usar en grupos
handler.admin = true; // Solo administradores pueden usarlo
handler.botAdmin = true; // El bot debe ser administrador para ejecutar el comando

export default handler;