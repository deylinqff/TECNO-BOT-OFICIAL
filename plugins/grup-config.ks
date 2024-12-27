let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icons) 
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
return conn.reply(m.chat, `⚙️ *OPCIÓN NO VÁLIDA DETECTADA* ⚙️\n\n┌───◉ Ejemplo de uso:\n│\n│   ➤ *○ !${command} abrir*\n│   ➤ *○ !${command} cerrar*\n│   ➤ *○ !${command} bloquear*\n│   ➤ *○ !${command} desbloquear*\n└───────•`, m, rcanal)
await conn.groupSettingUpdate(m.chat, isClose)

if (isClose === 'not_announcement'){
m.reply(`🔓 *[GRUPO ABIERTO]* 🔓\n\n┌───◉ *Estado del grupo:* \n│\n│   ➤ *AHORA TODOS PUEDEN ESCRIBIR* 📝\n└───────•`)
}

if (isClose === 'announcement'){
m.reply(`🔐 *[GRUPO CERRADO]* 🔐\n\n┌───◉ *Estado del grupo:* \n│\n│   ➤ *SÓLO LOS ADMINISTRADORES PUEDEN ESCRIBIR* 🛠️\n└───────•`)
}}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['grupo']
handler.command = ['grupo', 'group']
handler.admin = true
handler.botAdmin = true
export default handler 