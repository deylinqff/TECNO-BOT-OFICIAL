import { Client, Buttons, MessageMedia } from 'whatsapp-web.js';
const client = new Client();

client.on('message', async message => {
  if (message.body === '!staff') {
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

    // Verificar variables globales con valores predeterminados
    const imageUrl = global.imageUrl || "https://files.catbox.moe/owl2rl.jpg"; // Imagen predeterminada
    const media = MessageMedia.fromUrl(imageUrl); // Convertir la URL a MessageMedia

    // Crear botones
    const buttons = new Buttons(
      media,
      [
        { body: 'Contacto Propietario', id: 'contacto_propietario' },
        { body: 'GitHub Proyecto', id: 'github_proyecto' }
      ],
      'Staff Oficial',
      staff
    );

    // Enviar mensaje con botones
    await client.sendMessage(message.from, buttons);
  }
});

// Configuración del comando
client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();
