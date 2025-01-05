import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `¡Ingresa el nombre de una canción para escuchar en Soundcloud!`, m);

  await m.react('⏳'); // Reacción de búsqueda

  try {
    // Buscar la canción en la API de SoundCloud
    const apiResponse = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    const json = await apiResponse.json();

    if (json.length === 0) {
      return conn.reply(m.chat, `No se encontraron resultados para la búsqueda "${text}". Por favor, intenta con otro nombre.`, m);
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
    await conn.reply(m.chat, `¡Aquí tienes tu música! Disfrútala. `, m);

  } catch (error) {
    console.error('Error al descargar el audio:', error);
    await conn.reply(m.chat, `¡Ups! Algo salió mal. Por favor, intenta nuevamente más tarde. Si el problema persiste, contacta al administrador.`, m);
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
    return response.data;
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    throw error; // Propagar el error para que sea manejado en el bloque catch principal
  }
}

// ... (resto de la configuración del handler)
