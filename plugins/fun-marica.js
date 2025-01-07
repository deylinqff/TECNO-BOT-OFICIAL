// Código creado por Deyin
const handler = async (m, { conn }) => {
  const audioUrl = 'https://files.catbox.moe/ozmhxx.m4a'; // URL del audio
  const who = m.mentionedJid && m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.fromMe 
      ? conn.user.jid 
      : m.sender;

  // Obtener remitente del mensaje citado, si existe
  const mentionedUser = m.quoted && m.quoted.sender ? m.quoted.sender : null;

  try {
    // Obtener la imagen de perfil del usuario o usar una imagen por defecto
    const avatarUrl = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    
    // Generar URL de la imagen procesada con la API
    const processedImageUrl = `https://some-random-api.com/canvas/gay?avatar=${encodeURIComponent(avatarUrl)}`;

    // Enviar la imagen generada al chat
    await conn.sendMessage(m.chat, {
      image: { url: processedImageUrl },
      caption: '🏳️‍🌈 𝑴𝒊𝒓𝒆𝒏 𝒂 𝒆𝒔𝒕𝒆 𝑮𝒂𝒚 🏳️‍🌈'
    }, { quoted: m });

    // Configuración del mensaje de audio
    const mentionOptions = {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `gay_audio.mp3`,
      ptt: true,
    };

    // Si hay un usuario mencionado o citado, agrega detalles
    if (mentionedUser) {
      const mentionedAvatarUrl = await conn.profilePictureUrl(mentionedUser, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
      mentionOptions.mentions = [mentionedUser]; // Menciona al usuario citado
      mentionOptions.caption = `🏳️‍🌈 @${mentionedUser.split('@')[0]} 𝑴𝒊𝒓𝒆𝒏 𝒂 𝒆𝒔𝒕𝒆 𝑮𝒂𝒚 🏳️‍🌈`; // Mensaje con mención
    }

    // Enviar el mensaje de audio
    await conn.sendMessage(m.chat, mentionOptions, { quoted: m });
  } catch (err) {
    console.error('Error en el handler:', err);
    await conn.sendMessage(m.chat, { text: 'Hubo un error procesando tu solicitud. Intenta de nuevo.' }, { quoted: m });
  }
};

// Configuración del comando
handler.help = ['marica'];
handler.tags = ['fun'];
handler.command = /^(marica)$/i;

export default handler;