let handler = async (m, { conn, text, args, participants }) => {
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return conn.reply(m.chat, `🚩 Etiqueta a un usuario para eliminar sus últimos 10 mensajes.`, m);
  }

  const target = m.mentionedJid[0]; // Usuario etiquetado
  const chat = m.chat;

  try {
    // Obtener mensajes del chat
    const messages = await conn.fetchMessages(chat, 50); // Buscar los últimos 50 mensajes (máximo permitido por WhatsApp)
    const targetMessages = messages
      .filter((msg) => msg.key.participant === target)
      .slice(0, 10); // Filtrar mensajes del usuario etiquetado y limitar a 10

    if (targetMessages.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron mensajes recientes del usuario etiquetado.`, m);
    }

    // Eliminar mensajes
    for (const msg of targetMessages) {
      await conn.sendMessage(chat, { delete: msg.key });
    }

    conn.reply(m.chat, `✅ Se eliminaron ${targetMessages.length} mensajes de la persona etiquetada.`, m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Hubo un error al intentar eliminar los mensajes.`, m);
  }
};

handler.help = ['delete2'];
handler.tags = ['group'];
handler.command = /^delete2$/i;
handler.group = true; // Solo se puede usar en grupos
handler.admin = true; // Solo administradores pueden usarlo
handler.botAdmin = true; // El bot debe ser administrador para ejecutar el comando

export default handler;