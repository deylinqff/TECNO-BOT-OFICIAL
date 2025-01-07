import { sticker } from '../lib/sticker.js';

const redes = 'https://tu-enlace-o-dominio.com';
const icons = null; // Define un valor si es necesario

let handler = async (m, { conn, args }) => {
  let stiker = false;

  try {
    let q = m.quoted ? m.quoted : m; // Mensaje citado o actual
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Verificar si el mensaje incluye imagen, video o sticker webp
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
        return m.reply(`⚙️ *¡El video no puede durar más de 8 segundos!*`);
      }

      let media = await q.download?.(); // Descargar contenido multimedia
      if (!media) {
        return conn.reply(
          m.chat,
          `🚀 *_No se pudo descargar el archivo multimedia. Por favor, inténtalo de nuevo._*`,
          m
        );
      }

      try {
        // Intentar crear el sticker directamente
        stiker = await sticker(media, false, global.packname, global.author);
      } catch (e) {
        console.error('Error al generar el sticker:', e);
        // Si falla, intentar subir y convertir el archivo
        let url;
        if (/webp/g.test(mime)) {
          url = await webp2png(media);
        } else if (/image/g.test(mime)) {
          url = await uploadImage(media);
        } else if (/video/g.test(mime)) {
          url = await uploadFile(media);
        }
        stiker = await sticker(false, url, global.packname, global.author);
      }
    } else if (args[0]) {
      // Procesar si se proporciona un enlace
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