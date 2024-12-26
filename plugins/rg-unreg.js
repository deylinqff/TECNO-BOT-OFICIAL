let handler = async function (m, { conn, args, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (!user.registered) return m.reply(`🚩 No tienes un registro activo.`)
  user.registered = false
  m.reply(`🚩 Registro eliminado correctamente.`)
}
handler.help = ['unreg'] 
handler.tags = ['rg']

handler.command = ['unreg'] 
handler.register = true

export default handler