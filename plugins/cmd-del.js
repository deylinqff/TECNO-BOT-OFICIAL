let handler = async (m, { text }) => {
let hash = text
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
if (!hash) return conn.reply(m.chat, `🧑‍💻 INGRESE EL NOMBRE DEL COMANDO.`, m, rcanal)
try {
let sticker = global.db.data.sticker
if (sticker[hash] && sticker[hash].locked) return conn.reply(m.chat, `🧑‍💻 NO PUEDES ELIMINAR ESTE COMANDO`, m, rcanal)
delete sticker[hash]
await conn.reply(m.chat, `🧑‍💻 COMANDO ELIMINADO CON EXITO`, m, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['cmd'].map(v => 'del' + v + ' *<texto>*')
handler.tags = ['cmd']
handler.command = ['delcmd']
handler.owner = true

export default handler