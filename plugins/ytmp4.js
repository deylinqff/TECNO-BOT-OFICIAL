import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`)
    let json = await api.json()
    let title = json.result.metadata.title
    let dl_url = json.result.download.url
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

    // Reacción con 🚀
    await conn.sendMessage(m.chat, { react: { text: '🚀', key: m.key } })

  } catch (error) {
    console.error(error)

    // Enviar un sticker en caso de error
    const errorSticker = 'https://path_to_your_sticker.png' // Cambia por la URL de tu sticker
    await conn.sendMessage(m.chat, { sticker: { url: errorSticker } }, { quoted: m })
  }
}

HS.command = ['ytmp3']

export default HS