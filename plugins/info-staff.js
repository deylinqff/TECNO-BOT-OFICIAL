let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `╭[🚀 *EQUIPO DE AYUDANTES* 🚀]╮
┃
┃ 🤖 *Bot:* ${global.botname || "Bot Desconocido"}
┃ 🌟 *Versión:* ${global.vs || "1.0"}
┃
┣━━━━━👑 *Propietario* ━━━━━┫
┃ • *Nombre:* 𝐃𝐞𝐲𝐥𝐢𝐧
┃ • *Rol:* 𝙿𝚛𝚘𝚙𝚒𝚎𝚝𝚊𝚛𝚒𝚘
┃ • *Número:* wa.me/50433222264
┃ • *GitHub:* (https://github.com/Deylinel/TECNO-BOT-OFICIAL)
┃
┣━━━🚀 *Colaboradores* ━━━┫
┃ • *Nombre:* 𝐃𝐢𝐞𝐠𝐨
┃   *Rol:* 𝚂𝚘𝚙𝚘𝚛𝚝𝚎
┃   *Número:* wa.me/525539585733
┃
┃ • *Nombre:* 𝐍𝐢ñ𝐨 𝐏𝐢ñ𝐚
┃   *Rol:* 𝙼𝚘𝚍𝚎𝚛𝚊𝚍𝚘𝚛
┃   *Número:* wa.me/50557865603
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`
await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developers 👑`,
body: `✨ Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler