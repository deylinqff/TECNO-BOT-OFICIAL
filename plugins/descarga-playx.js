import ytdl from 'ytdl-core'
import fetch from 'node-fetch'
import { getVideoInfo } from 'some-music-api' // Reemplaza 'some-music-api' con el paquete de API adecuado que uses

const handler = async (m, { text, conn, args }) => {
  if (!text) {
    return conn.reply(m.chat, '💛 *Ingrese el nombre de la música*\n💛 *Ejemplo de uso:* .playx Shape of You', m)
  }

  await m.react('⏱️')
  conn.reply(m.chat, '⌛ Procesando tu solicitud...', m)

  let info;
  try {
    info = await getVideoInfo(text) // Obtén la información del video usando la API apropiada
  } catch (e) {
    await m.react('❎')
    return conn.reply(m.chat, '💛 Error: No se pudo obtener la información de la música.', m)
  }

  if (!info) {
    await m.react('❎')
    return conn.reply(m.chat, '💛 No se encontró información de la música.', m)
  }

  const { title, uploadDate, artist, image, url } = info
  conn.reply(m.chat, `💛 *Título:* ${title}\n💛 *Artista:* ${artist}\n💛 *Fecha de subida:* ${uploadDate}\n💛 *Enlace:* ${url}`, m)

  let musicStream;
  try {
    musicStream = ytdl(url, { filter: 'audioonly' })
  } catch (e) {
    await m.react('❎')
    return conn.reply(m.chat, '💛 Error: No se pudo descargar la música.', m)
  }

  try {
    await conn.sendMessage(m.chat, { audio: musicStream, caption: '🎵 Aquí tienes tu música', mimetype: 'audio/mp4' }, { quoted: m })
    await conn.sendFile(m.chat, image, 'image.jpg', artist) // Envía la imagen del artista
    await m.react('✅')
  } catch (e) {
    await m.react('❎')
    return conn.reply(m.chat, '💛 Error: No se pudo enviar la música.', m)
  }
}

handler.help = ['playx <nombre de la música>']
handler.tags = ['música', 'descargas']
handler.command = ['playx']
handler.register = true
handler.limit = true

export default handler