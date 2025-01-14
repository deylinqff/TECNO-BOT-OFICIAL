import { pinterest } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ Ejemplo de uso: ${usedPrefix + command} Miku Nakano`;

  try {
    // Realiza la búsqueda en Pinterest
    const results = await pinterest(text);

    // Verifica si hay resultados
    if (!results || results.length === 0) throw '⚠️ No se encontraron imágenes relacionadas.';

    // Selecciona una imagen al azar
    const imageUrl = results.getRandom();

    // Enviar la imagen al chat
    await conn.sendFile(
      m.chat,
      imageUrl,
      'pinterest.jpg',
      `
*❖  Pinterest:* ${text}
`.trim(),
      m,
      false,
      { mimetype: 'image/jpeg' } // Asegura el envío en formato JPEG
    );
  } catch (error) {
    console.error(error);
    throw '❌ Ocurrió un error al obtener las imágenes. Intenta nuevamente.';
  }
};

handler.help = ['pinterest'];
handler.tags = ['img'];
handler.command = ['pinterest'];

export default handler;