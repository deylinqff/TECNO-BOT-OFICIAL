let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, text}) {
  // Verifica si el mensaje es el comando para activar la detección de árabes
  if (text && text.toLowerCase() === '.acting anti arabe') {
    let chat = global.db.data.chats[m.chat]

    // Solo los administradores o el dueño pueden activar esta restricción
    if (!isAdmin && !isOwner) {
      return m.reply('🚫 Solo los administradores pueden activar esta restricción.')
    }

    // Mensaje de inicio de detección
    let arabicDetected = false
    let participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants)

    // Prefijos para detectar números árabes o que empiecen con '2'
    let forbidPrefixes = ["212", "2"]

    for (let participant of participants) {
      let sender = participant.id
      let senderNumber = sender.split('@')[0] // Extrae el número de teléfono

      // Verifica si el número comienza con alguno de los prefijos prohibidos
      for (let prefix of forbidPrefixes) {
        if (senderNumber.startsWith(prefix)) {
          arabicDetected = true
          // Envía el mensaje al usuario y lo elimina del grupo
          await m.reply(`🚩 En este grupo solo se permite personas de habla hispana. ${sender}`)
          await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
        }
      }
    }

    if (!arabicDetected) {
      m.reply('✅ No se detectó ningún usuario árabe en el grupo.')
    } else {
      m.reply('✅ Se ha realizado la detección de usuarios árabes y se han eliminado.')
    }

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