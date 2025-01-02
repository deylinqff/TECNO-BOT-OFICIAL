import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
    let stiker = false;
    try {
        // Verificar si se está respondiendo a un mensaje
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp|image|video/.test(mime)) {
            // Verificar duración de videos
            if (/video/.test(mime) && (q.msg || q).seconds > 8) {
                return m.reply(`☁️ *¡El video no puede durar más de 8 segundos!*`);
            }

            // Descargar contenido
            let img = await q.download?.();
            if (!img) {
                return conn.reply(m.chat, `🍁 *_No se pudo descargar el archivo. Asegúrate de enviar una imagen/video/gif y responder con el comando._*`, m);
            }

            // Intentar crear el sticker
            try {
                stiker = await sticker(img, false, global.packname || 'Sticker', global.author || 'Bot');
            } catch (e) {
                console.error('Error al crear el sticker:', e);
            }

            // Si falla, subir el archivo y reintentar
            if (!stiker) {
                let out = /webp/.test(mime)
                    ? await webp2png(img)
                    : /image/.test(mime)
                    ? await uploadImage(img)
                    : /video/.test(mime)
                    ? await uploadFile(img)
                    : null;

                if (!out || typeof out !== 'string') {
                    return conn.reply(m.chat, `🌲 *_Error al procesar el archivo. Intenta con otro formato._*`, m);
                }

                stiker = await sticker(false, out, global.packname || 'Sticker', global.author || 'Bot');
            }
        } else if (args[0]) {
            // Verificar si el argumento es una URL válida
            if (isUrl(args[0])) {
                stiker = await sticker(false, args[0], global.packname || 'Sticker', global.author || 'Bot');
            } else {
                return m.reply(`💫 *_El URL proporcionado no es válido. Asegúrate de que sea una imagen válida._*`);
            }
        } else {
            return m.reply(`🍂 *_Envía una imagen/video/gif o proporciona un URL para convertirlo en sticker._*`);
        }
    } catch (e) {
        console.error('Error general:', e);
        return conn.reply(m.chat, `🌲 *_Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde._*`, m);
    } finally {
        if (stiker) {
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
                contextInfo: {
                    forwardingScore: 200,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: false,
                        title: global.packname || 'Sticker',
                        body: `Creado con éxito`,
                        mediaType: 2,
                        sourceUrl: global.sourceUrl || '',
                        thumbnail: global.thumbnail || null
                    }
                }
            });
        } else {
            conn.reply(m.chat, `🌲 *_La conversión ha fallado. Intenta con otro archivo o formato._*`, m);
        }
    }
};

handler.help = ['sticker <imagen/video/gif>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

// Función para validar URL
const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};