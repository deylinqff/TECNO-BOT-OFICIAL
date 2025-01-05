import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text }) => {
  if (!text) 
    return conn.reply(m.chat, `🎵 *Ingrese el nombre de una canción para buscar en SoundCloud.*`, m);

  await m.react('🔍');
  try {
    // Búsqueda en SoundCloud
    let searchApi = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    let searchResults = await searchApi.json();

    if (!searchResults.length) 
      return conn.reply(m.chat, `❌ *No se encontraron resultados para:* "${text}"`, m);

    let song = searchResults[0]; // Primer resultado
    let { title, url, image } = song;

    // Descarga de la canción
    let downloadApi = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
    let downloadData = await downloadApi.json();

    let { link: downloadUrl, quality } = downloadData;

    let audioBuffer = await getBuffer(downloadUrl);

    // Mensaje de respuesta
    let responseText = `🎵 *SoundCloud Music*\n\n`;
    responseText += `🎧 *Título:* ${title}\n`;
    responseText += `📥 *Calidad:* ${quality}\n`;
    responseText += `🔗 *URL:* ${url}\n\n`;
    responseText += `🚀 *Bot de descargas SoundCloud.*`;

    // Enviar la imagen y el audio
    await conn.sendFile(m.chat, image, 'cover.jpg', responseText, m);
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, `⚠️ *Ocurrió un error al intentar descargar la canción.*`, m);
  }
};

handler.help = ['soundcloud *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['soundcloud', 'sound', 'play'];

export default handler;

// Función para obtener el buffer del archivo
const getBuffer = async (url) => {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener buffer: ${error}`);
    throw error;
  }
};