import { sticker } from '../lib/sticker.js';
import sharp from 'sharp';

const redes = 'https://tu-enlace-o-dominio.com';
const icons = null; // Si necesitas un icono, coloca su ruta o URL aquí

// Función para ajustar la resolución del video o imagen a 512x512
const resizeMedia = async (buffer) => {
  try {
    return await sharp(buffer).resize(512, 512, { fit: 'contain' }).toBuffer();
  } catch (e) {
    console.error('Error al redimensionar el archivo:', e);
    throw e;
  }
};

let handler = async (m, { conn, args }) => {
  let stiker = false;

  try {
    let q = m.quoted ? m.quoted : m; // Obtener mensaje citado o actual
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      // Validar duración si es un video
      if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
        return m.reply(`⚙️ *¡El video no puede durar más de 8 segundos!*`);
      }

      // Descargar contenido multimedia
      let media = await q.download?.();
      if (!media) {
        return conn.reply(
          m.chat,
          `🚀 *_No se pudo descargar el archivo multimedia. Por favor, inténtalo de nuevo._*`,
          m
        );
      }

      // Escalar la resolución del archivo
      media = await resizeMedia(media);

      try {
        // Crear el sticker directamente
        stiker = await sticker(media, false, global.packname, global.author);
      } catch (e) {
        console.error('Error al generar el sticker:', e);
        return conn.reply(m.chat, '⚠️ Ocurrió un error al procesar el sticker.', m);
      }
    } else if (args[0]) {
      // Procesar si se proporciona una URL
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply(`💫 El URL proporcionado no es válido.`);
      }
    }
  } catch (e) {
    console.error('Error general:', e);
    return conn.reply(m.chat, '⚠️ Ocurrió un error al crear el sticker.', m);
  }

  // Enviar el sticker al chat
  if (stiker) {
    conn.sendFile(
      m.chat,
      stiker,
      'sticker.webp',
      '',
      m,
      true,
      {
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: false,
            title: global.packname,
            body: `botbarboza - Ai 🚀`,
            mediaType: 2,
            sourceUrl: redes,
            thumbnail: icons,
          },
        },
      },
      { quoted: m }
    );
  } else {
    return conn.reply(m.chat, '⚠️ No se pudo generar el sticker. Intenta de nuevo.', m);
  }
};

// Ayuda y configuración del comando
handler.help = ['sticker <imagen/video>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

// Validar si una cadena es una URL válida
const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};