import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text }) => {
  if (!text) 
    return conn.reply(m.chat, `🎵 *Ingrese el nombre o el enlace de una canción para buscar en SoundCloud.*`, m);

  await m.react('🔍');
  try {
    // Si el usuario ingresa un enlace directo
    let isUrl = text.startsWith('http');
    let url = text;

    if (!isUrl) {
      // Buscar en SoundCloud y obtener el enlace
      let searchApi = await fetch(`https://api-v3.soundcloud-downloader.com/search?q=${encodeURIComponent(text)}`);
      let searchResults = await searchApi.json();

      if (!searchResults.length) 
        return conn.reply(m.chat, `❌ *No se encontraron resultados para:* "${text}"`, m);

      url = searchResults[0].url; // Tomar el primer resultado
    }

    // Descargar la canción usando la URL
    let downloadApi = await fetch(`https://api.snappea.com/v1/song?url=${encodeURIComponent(url)}`);
    let downloadData = await downloadApi.json();

    if (!downloadData.success) 
      return conn.reply(m.chat, `⚠️ *Error al intentar descargar la canción.*`, m);

    let { title, thumbnail, audio } = downloadData.data;

    // Mensaje de respuesta
    let responseText = `🎵 *SoundCloud Music*\n\n`;
    responseText += `🎧 *Título:* ${title}\n`;
    responseText += `🔗 *URL:* ${url}\n\n`;
    responseText += `🚀 *Bot de descargas SoundCloud.*`;

    // Enviar la imagen y el audio
    await conn.sendFile(m.chat, thumbnail || 'https://via.placeholder.com/150', 'cover.jpg', responseText, m);
    await conn.sendMessage(m.chat, { audio: { url: audio }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, `⚠️ *Ocurrió un error al intentar procesar la solicitud.*`, m);
  }
};

handler.help = ['soundcloud *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['soundcloud', 'sound', 'playx'];

export default handler;