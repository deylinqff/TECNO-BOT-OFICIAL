import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (!m.isGroup) return true;

  // Verifica si el mensaje es un comando
  const command = m.text.toLowerCase().trim();

  // Respuesta al comando `staff` o `colaboradores`
  if (command === '!staff' || command === '!colaboradores') {
    const staff = `
╭[🚀 *EQUIPO DE AYUDANTES* 🚀]╮
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
`.trim();

    // Foto de perfil del grupo o imagen predeterminada
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://i.ibb.co/fNCMzcR/file.jpg');
    let img = await (await fetch(pp)).buffer();

    // Botones interactivos
    const buttons = [
      { buttonId: 'audio', buttonText: { displayText: '✅ Esta bien' }, type: 1 },
      { buttonId: 'video', buttonText: { displayText: '❎ Esta mal' }, type: 1 },
    ];

    // Enviar mensaje del staff
    await conn.sendMessage(m.chat, {
      text: staff,
      image: img,
      buttons: buttons,
      footer: 'Selecciona una opción:',
    });

    console.log(`Información de staff enviada automáticamente en respuesta al comando.`);
  }
}