let handler = async (m, { conn, text, args }) => {
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return conn.reply(m.chat, `🚩 Debes etiquetar a un usuario para eliminar sus últimos 10 mensajes.`, m);
  }

  // Obtener el usuario etiquetado
  const target = m.mentionedJid[0].includes('@s.whatsapp.net') 
    ? m.mentionedJid[0] 
    : `${m.mentionedJid[0]}@s.whatsapp.net`;
  const chat = m.chat;

  try {
    // Cargar los últimos 50 mensajes del chat
    const messages = await conn.fetchMessages(chat, 50);
    if (!messages || messages.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron mensajes en este chat.`, m);
    }

    // Filtrar los mensajes del usuario etiquetado
    const targetMessages = messages
      .filter((msg) => 
        (msg.key.participant === target || msg.key.remoteJid === target) && 
        !msg.key.fromMe // Asegurarse de que no sean mensajes del bot
      )
      .slice(0, 10); // Limitar a 10 mensajes

    if (targetMessages.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron mensajes recientes del usuario etiquetado.`, m);
    }

    // Intentar eliminar cada mensaje del usuario
    let deletedCount = 0;
    for (const msg of targetMessages) {
      try {
        await conn.sendMessage(chat, { delete: msg.key });
        deletedCount++;
      } catch (err) {
        console.error(`Error eliminando mensaje:`, err);
      }
    }

    // Confirmar eliminación
    if (deletedCount > 0) {
      conn.reply(m.chat, `✅ Se eliminaron ${deletedCount} mensajes del usuario etiquetado.`, m);
    } else {
      conn.reply(m.chat, `❌ No se pudieron eliminar los mensajes del usuario etiquetado.`, m);
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Ocurrió un error al intentar eliminar los mensajes: ${e.message}`, m);
  }
};

handler.help = ['delete2'];
handler.tags = ['group'];
handler.command = /^delete2$/i;
handler.group = true; // Solo se puede usar en grupos
handler.admin = true; // Solo administradores pueden usarlo
handler.botAdmin = true; // El bot debe ser administrador para ejecutar el comando

export default handler;