import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let user = db.data.users[m.sender]
  let time = user.lastmining + 10000 //tiempo de espera en minutos
  if (new Date - user.lastmiming < 10000) return await conn.reply(m.chat, `*ESPERA UNOS MINUTOS PARA USAR OTRO COMANDO*`, m)
  try {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('╰⊱⚠️⊱ *ADVERTENCIA | WARNING* ⊱⚠️⊱╮\n\nEL VIDEO NO DEBE DURAR MÁS DE *7* SEGUNDOS\n\nTHE VIDEO SHOULD NOT LAST MORE THAN *7* SECONDS')
      let img = await q.download?.()
      if (!img) throw `╰⊱❗️⊱ *LO USÓ MAL | USED IT WRONG* ⊱❗️⊱╮\n\nRESPONDA A UNA IMAGEN, VIDEO, GIF O ENLACE DE TIPO *.jpg* PARA REALIZAR EL STICKER USANDO *${usedPrefix + command}*\n\nRESPONDA A UNA IMAGEN, VIDEO, GIF O ENLACE DE TIPO *.jpg* PARA CREAR EL STICKER CON *${usedPrefix + command}_*`
      let out
      try {
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
        await conn.reply(m.chat, `${eg}⏳ *CREANDO STICKER, UN MOMENTO...* 🚀`, m)
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packname, global.author)
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL inválido')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: ` 𝗦𝘂𝗽𝗲𝗿 𝗧𝗲𝗰𝗻𝗼 -𝗕𝗼𝘁 `, mediaType: 2, sourceUrl: accountsgb, thumbnail: imagen1}}}, { quoted: m })
    else throw '╰⊱❗️⊱ *LO USÓ MAL | USED IT WRONG* ⊱❗️⊱╮\n\nVUELVA A INTENTAR RESPONDER A UNA IMAGEN, VIDEO, GIF O ENLACE DE TIPO *.jpg* PARA REALIZAR EL STICKER\n\nTRY AGAIN, RESPOND TO AN IMAGE, VIDEO, GIF, OR LINK OF TYPE *.jpg* TO MAKE THE STICKER'
  }
  user.lastmiming = new Date * 1
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker'] 

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return minutes + " m y " + seconds + " s " 
}

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}