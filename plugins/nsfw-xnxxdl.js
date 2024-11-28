import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!global.db.data.chats[m.chat].nsfw) return conn.reply(m.chat, `[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw`, m, rcanal)
if (!args[0]) return conn.reply(m.chat, `🧑‍💻 INGRESE EL LINK DEL VIDEO XNXX*`, m, rcanal)

let user = global.db.data.users[m.sender]
await m.react('🔥')
try {
let { title, dl_url } = await Starlights.xnxxdl(args[0])
await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.tags = ['nsfw', 'downloader']
handler.help = ['xnxxdl *<url>*']
handler.command = ['xnxxdl']
//handler.limit = 200
handler.group = true 
handler.register = true 
export default handler