

let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*EL USUARIO NO SE ENCUENTRA EN MI BASE DE DATOS🚀*`)
   let user = global.db.data.users[who]
   await m.reply(`${who == m.sender ? `TIENES *${user.bank} 🌠 ESTRELLAS* EN EL BANCO🏦` : `El usuario @${who.split('@')[0]} TIENE *${user.bank} 🌠 ESTRELLAS* EN EL BANCO🏦`}`, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco'] 
handler.register = true 
export default handler 