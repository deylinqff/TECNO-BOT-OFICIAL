let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, text}) {
  // Verifica si el mensaje es un comando
  if (text && text.toLowerCase() === '.antiarabe') {
    let chat = global.db.data.chats[m.chat]

    // Solo los administradores o el dueño pueden activar el comando
    if (!isAdmin && !isOwner) {
      return m.reply('🚫 Solo los administradores pueden activar esta restricción.')
    }

    // Activar la restricción
    chat.onlyLatinos = true
    m.reply('✅ Restricción de solo hablantes de español activada.')
    return true
  }

  // Si el mensaje no es un comando y es en un grupo
  if (!m.isGroup) return !1
  let chat = global.db.data.chats[m.chat]

  if (isBotAdmin && chat.onlyLatinos && !isAdmin && !isOwner) {
    let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"]

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