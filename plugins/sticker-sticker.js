import { sticker } from '../lib/sticker.js'
//import uploadFile from '../lib/uploadFile.js'
//import uploadImage from '../lib/uploadImage.js'
//import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    
    // Verificar si el tipo de archivo es una imagen, video o gif
    if (/webp|image|video/g.test(mime)) {
      
      // Verificar si el archivo es un video y tiene más de 8 segundos
      if (/video/g.test(mime)) {
        if ((q.msg || q).seconds > 8) {
          return m.reply('🌷 *¡El video no puede durar más de 8 segundos!*')
        }
      }
      
      // Descargar el archivo
      let img = await q.download?.()

      if (!img) {
        return conn.reply(m.chat, '🌸 *_Oops! La conversión no pudo completarse. Por favor, envía primero una imagen, video o gif, y luego utiliza el comando nuevamente._*', m)
      }

      let out
      try {
        // Intentar crear un sticker
        stiker = await sticker(img, false, global.packsticker, global.author)
      } catch (e) {
        console.error(e)
      } finally {
        // Si no se pudo crear el sticker, realizar una conversión o carga alterna
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packsticker, global.author)
        }
      }
    } else if (args[0]) {
      // Verificar si el argumento es una URL válida
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.author)
      } else {
        return m.reply('🥀 El URL es incorrecto')
      }
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) {
      // Enviar el sticker
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
        contextInfo: {
          'forwardingScore': 200,
          'isForwarded': false,
          externalAdReply: {
            showAdAttribution: false,
            title: packname,
            body: `⏤͟͞ू⃪ ፝͜⁞𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭✰⃔࿐`,
            mediaType: 2,
            sourceUrl: redes,
            thumbnail: icons
          }
        }
      })
    } else {
      return conn.reply(m.chat, '🌸 *_Oops! La conversión no pudo completarse. Por favor, envía primero una imagen, video o gif, y luego utiliza el comando nuevamente._*', m)
    }
  }
}

handler.help = ['sticker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.group = false
handler.register = true
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}