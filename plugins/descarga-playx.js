import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '¡Escribe el nombre de la canción que quieres escuchar! Por ejemplo: `.playx Despacito`', m);

  await m.react(''); // Reacción de música

  try {
    // Buscar la canción en la API de SoundCloud
    const apiResponse = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    const json = await apiResponse.json();

    if (json.length === 0) {
      return conn.reply(m.chat, `No encontré esa canción. ¿Quieres probar con otro nombre?`, m);
    }

    // Obtener el enlace de descarga de la primera canción encontrada
    const firstResult = json[0];
    const downloadUrl = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${firstResult.url}`);
    const downloadJson = await downloadUrl.json();

    // Descargar el archivo de audio
    const audioBuffer = await getBuffer(downloadJson.link);

    // Enviar el archivo de audio al usuario
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${firstResult.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

    // Enviar un mensaje de confirmación
    await conn.reply(m.chat, `¡Listo! Disfruta de tu música. `, m);

  } catch (error) {
    console.error('Error al descargar el audio:', error);
    await conn.reply(m.chat, `¡Oops! Algo salió mal. Intenta de nuevo más tarde.`, m);
  }
};

// Función auxiliar para descargar el archivo de audio
async function getBuffer(url) {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    });
    return response.emoji;
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    throw error; // Propagar el error para que sea manejado en el bloque catch principal
  }
}

// ... (resto de la configuración del handler)
