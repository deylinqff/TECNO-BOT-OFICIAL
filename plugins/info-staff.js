
import { Client, Buttons } from 'whatsapp-web.js';
const client = new Client();

client.on('message', async message => {
  if (message.body === 'menu') {
    let button = new Buttons(
      'Selecciona una opción', 
      [{ body: 'Audio' }, { body: 'Video' }], 
      'Opciones', 
      'Elige una opción'
    );
    client.sendMessage(message.from, button);
  } else if (message.body === '!staff') {
    // Información del staff con diseño
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

    try {
      // Verificar variables globales con valores predeterminados
      const imageUrl = global.imageUrl || "https://files.catbox.moe/owl2rl.jpg"; // Imagen predeterminada
      const sourceUrl = global.redes || "https://github.com/Deylinel/TECNO-BOT-OFICIAL"; // URL del proyecto
      const thumbnailUrl = global.icono || "https://files.catbox.moe/owl2rl.jpg"; // Miniatura

      // Enviar el mensaje con diseño
      await client.sendMessage(message.from, {
        image: { url: imageUrl },
        caption: staff,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: `🥷 Developers 👑`,
            body: `✨ Staff Oficial`,
            mediaType: 1,
            sourceUrl: sourceUrl,
            thumbnailUrl: thumbnailUrl,
          },
        },
      });

      // Reacción al comando (opcional)
      if (global.emoji) {
        await message.react(global.emoji);
      }
    } catch (error) {
      // Manejo de errores con mensaje más claro
      console.error("Error al ejecutar el comando staff:", error);
      await client.sendMessage(
        message.from,
        "⚠️ *Error al ejecutar el comando:*\n" +
        "Por favor, verifica la configuración del bot o consulta la consola para más detalles."
      );
    }
  }
});

// Configuración del comando
client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();
