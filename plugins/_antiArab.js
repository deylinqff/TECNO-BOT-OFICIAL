let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, text}) {
  // Verifica si el mensaje es un comando
  if (text && text.toLowerCase() === '.antiarabe') {
    let chat = global.db.data.chats[m.chat]

    // Solo los administradores o el dueño pueden activar esta restricción
    if (!isAdmin && !isOwner) {
      return m.reply('🚫 Solo los administradores pueden activar esta restricción.')
    }

    // Activar la restricción
    chat.onlyLatinos = true
    await global.db.write() // Asegúrate de guardar los cambios en la base de datos
    m.reply('✅ Restricción de solo hablantes de español activada.')
    return true
  }

  // Si el mensaje no es un comando y es en un grupo
  if (!m.isGroup) return true

  let chat = global.db.data.chats[m.chat]

  // Verifica si la restricción está activada y si el usuario no es administrador
  if (chat.onlyLatinos && isBotAdmin && !isAdmin && !isOwner) {
    let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"]

    // Revisa el prefijo del número de teléfono del mensaje entrante
    for (let prefix of forbidPrefixes) {
      if (m.sender.startsWith(prefix)) {
        m.reply('🚩 En este grupo solo se permite personas de habla hispana.', m.sender)
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        return false
      }
    }
  }

  return true
}

export default handler