import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  const h = ` ㌹ TECNO-BOT`;
  const i = `By Deyin`;

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 11)
        return conn.sendMessage(m.chat, { text: 'Máximo 10 segundos', ...global.rcanal });
      let img = await q.download?.();
      if (!img) throw `🚀 Responde a una imagen o video con *${usedPrefix + command}*`;

      let out;
      try {
        stiker = await sticker(img, false, h, i);
      } catch (e) {
        console.error('Error en sticker:', e);
      } finally {
        if (!stiker) {
          try {
            if (/webp/g.test(mime)) out = await webp2png(img);
            else if (/image/g.test(mime)) out = await uploadImage(img);
            else if (/video/g.test(mime)) out = await uploadFile(img);
            if (typeof out !== 'string') out = await uploadImage(img);
            stiker = await sticker(false, out, h, i);
          } catch (e) {
            console.error('Error procesando sticker:', e);
          }
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], h, i);
      } else {
        return conn.sendMessage(m.chat, { text: 'URL inválido', ...global.rcanal });
      }
    }
  } catch (e) {
    console.error('Error general:', e);
    return conn.sendMessage(m.chat, { text: '🚀 Y el video o la imagen o gif.', ...global.rcanal });
  } finally {
    if (stiker) {
      const textoEncabezado = `【 ✯ TEAM ✯ DARK - OFICIAL ✯ 】\nDarkCore - Ai\n`; // Personaliza el encabezado aquí
      conn.sendFile(m.chat, stiker, 'sticker.webp', textoEncabezado, m, false, global.rcanal);
    } else {
      conn.sendMessage(m.chat, { text: '🚀 Responde a una imagen o video.', ...global.rcanal });
    }
  }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker'];

export default handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};