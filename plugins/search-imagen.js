import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Validar que se proporcione un texto para buscar
  if (!text) throw `*🌹 Uso Correcto: ${usedPrefix + command} <nombre de la búsqueda>*`;

  // Mensaje de descarga inicial
  conn.reply(
    m.chat,
    '🌸 *Descargando su imagen, por favor espere...*',
    m,
    {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: 'Buscador de Imágenes',
          body: 'Generado con BochilTeam',
          previewType: 0,
          thumbnail: icons,
          sourceUrl: channel,
        },
      },
    }
  );

  // Realizar búsqueda de imágenes
  try {
    const res = await googleImage(text); // Buscar imágenes
    const image = await res.getRandom(); // Obtener una imagen aleatoria

    // Enviar la imagen encontrada
    await conn.sendFile(
      m.chat,
      image, // URL de la imagen
      'imagen.jpg', // Nombre del archivo
      `🌷 *Resultado para:* ${text}`,
      m
    );
  } catch (err) {
    // Manejo de errores en caso de falla
    conn.reply(m.chat, '❌ *No se pudo obtener la imagen. Intente con otra búsqueda.*', m);
  }
};

handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'descargas'];
handler.command = ['image', 'imagen']; // Comandos disponibles
handler.group = true; // Solo para grupos
handler.register = true;

export default handler;