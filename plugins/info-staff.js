const client = require('twilio')(accountSid, authToken);

let handler = async (m, { conn }) => {
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
    await conn.sendMessage(m.chat, {
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

    // Enviar mensaje con opciones rápidas usando Twilio
    client.messages.create({
      body: 'Selecciona una opción:',
      from: 'whatsapp:+14155238886', // Tu número de WhatsApp de Twilio
      to: 'whatsapp:+521234567890', // Número del destinatario
      mediaUrl: ['https://example.com/image.jpg'],
      quickReplies: {
        type: 'list',
        options: [
          {
            "title": "Audio",
            "payload": "audio"
          },
          {
            "title": "Video",
            "payload": "video"
          }
        ]
      }
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));

    // Reacción al comando (opcional)
    if (global.emoji) {
      await m.react(global.emoji);
    }
  } catch (error) {
    // Manejo de errores con mensaje más claro
    console.error("Error al ejecutar el comando staff:", error);
    await m.reply(
      "⚠️ *Error al ejecutar el comando:*\n" +
      "Por favor, verifica la configuración del bot o consulta la consola para más detalles."
    );
  }
};

// Configuración del comando
handler.help = ["staff"];
handler.command = ["colaboradores", "staff"];
handler.register = true;
handler.tags = ["main"];

export default handler;