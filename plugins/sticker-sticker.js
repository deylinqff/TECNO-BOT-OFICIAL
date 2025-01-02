import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;

  // Verificar si el usuario está en la base de datos
  let user = db.data.users[m.sender] || { lastmining: 0 };
  db.data.users[m.sender] = user;

  // Tiempo de espera entre comandos
  const cooldown = 10000; // 10 segundos
  if (new Date() - user.lastmining < cooldown) {
    return await conn.reply(
      m.chat,
      '*⏳ ESPERA UNOS MINUTOS PARA USAR OTRO COMANDO*',
      m
    );
  }

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 7) {
        return m.reply(
          '⚠️ *ADVERTENCIA* ⚠️\nEl video no debe durar más de *7 segundos*.'
        );
      }

      let img = await q.download?.();
      if (!img) {
        throw '⚠️ *Error: Responde a una imagen, video, GIF o URL válida para crear el sticker.*';
      }

      let out;
      try {
        stiker = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      } finally {
        await conn.reply(m.chat, '⏳ *Creando sticker, espera un momento...*', m);
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packname, global.author);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply('⚠️ *Error: URL inválida.*');
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
            'forwardingScore': 200,
            'isForwarded': false,
            externalAdReply: {
              showAdAttribution: false,
              title: 'Super TECNO-BOT',
              body: '🚀 WhatsApp Bot',
              mediaType: 2,
              sourceUrl: accountsgb,
              thumbnail: imagen1
            }
          }
        },
        { quoted: m }
      );
    } else {
      throw '⚠️ *Error al crear el sticker. Intenta nuevamente.*';
    }
    user.lastmining = new Date().getTime();
  }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

// Función para convertir tiempo en formato legible
function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes} m y ${seconds} s`;
}

// Validar si el texto es una URL válida
const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      'gi'
    )
  );
};