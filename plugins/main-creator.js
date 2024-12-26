let handler = async (m, { conn, usedPrefix, isOwner }) => {
let txt_owner = `
*╔═══❖•ೋ°°ೋ•❖═══╗*  
> _*`Hola, este es el número de mi creador.*_  
_¿Tienes fallas, sugerencias o quieres agregar el bot a tu grupo?_  
_Puedes contactarlo aquí:_  
*Deyin* : Wa.me/50488198573  
*╚═══❖•ೋ°°ೋ•❖═══╝*  
●▬▬▬▬▬▬๑۩۩๑▬▬▬▬▬▬●  
`
await conn.sendFile(m.chat, "https://files.catbox.moe/ge77oy.jpg", 'thumbnail.jpg', txt_owner, m, null, rcanal)
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler