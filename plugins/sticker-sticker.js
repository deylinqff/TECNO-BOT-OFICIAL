import { sticker } from '../lib/sticker.js';

const redes = 'https://tu-enlace-o-dominio.com'; // Define la URL aquí
const icons = null; // Asegúrate de definir icons si es necesario

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    
    // Verificamos si el contenido es un video, imagen o URL
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) {
        // Validamos la duración del video
        if ((q.msg || q).seconds > 8) {
          return m.reply(`☁️ *¡El video no puede durar más de 8 segundos!*`);
        }

        let img = await q.download?.();
        if (!img) {
          return conn.reply(m.chat, `☃️ *_¿Y el video? Intenta enviar primero imagen/video/gif y luego responde con el comando._*`, m);
        }

        try {
          // Convertimos el archivo en sticker ajustando proporciones
          stiker = await sticker(img, { packname: global.packname, author: global.author, quality: 100, type: 'full' });
        } catch (e) {
          console.error(e);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply(`💫 El URL es incorrecto`);
      }
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
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
              body: `botbarboza - Ai ☃️`,
              mediaType: 2,
              sourceUrl: redes,
              thumbnail: icons, // Asegúrate de que "icons" tenga un valor definido
            },
          },
        },
        { quoted: m }
      );
    } else {
      return conn.reply(
        m.chat,
        '⚡ *_¿Y el video? Intenta enviar primero imagen/video/gif y luego responde con el comando._*',
        m
      );
    }
  }
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

// Función para validar URL
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};