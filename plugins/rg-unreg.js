let handler = async function (m, { conn, args, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) return m.reply(`🚩 No tienes un registro activo.`)
  
  // Barra de carga
  let loadingBar = '⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜';
  let progress = 0;

  let loadingMessage = await conn.sendMessage(m.chat, { text: `Eliminando registro...\n[${loadingBar}] 0%` });

  const updateBar = (step) => {
    progress += step;
    let filled = Math.floor(progress / 10);
    loadingBar = '🟩'.repeat(filled) + '⬜'.repeat(10 - filled);
    return `Eliminando registro...\n[${loadingBar}] ${progress}%`;
  };

  for (let i = 10; i <= 100; i += 20) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1 segundo
    await conn.sendMessage(m.chat, { 
      edit: loadingMessage.key, 
      text: updateBar(20) 
    });
  }

  // Eliminar mensaje de barra de carga
  await conn.sendMessage(m.chat, { delete: loadingMessage.key });

  // Eliminar registro
  user.registered = false;
  m.reply(`🚀 Registro eliminado con exito ⚙.`)
}

handler.help = ['unreg'] 
handler.tags = ['rg']

handler.command = ['unreg'] 
handler.register = true

export default handler