let handler = async (m, { conn }) => {
  // Información del staff
  const staff = `
✨ *EQUIPO DE AYUDANTES*
🤖 *Bot:* ${global.botname || "Bot Desconocido"}
🌟 *Versión:* ${global.vs || "1.0"}

👑 *Propietario:*
• *Nombre:* Deylin
• *Rol:* Propietario
• *Número:* wa.me/50433222264
• *GitHub:* [Repositorio](https://github.com/Deylinel/TECNO-BOT-OFICIAL)

🚀 *Colaboradores:*
• *Nombre:* Diego
• *Rol:* Soporte
• *Número:* wa.me/525539585733

• *Nombre:* Niño Piña
• *Rol:* Moderador
• *Número:* wa.me/50557865603
`.trim();

  try {
    // Enviar el mensaje con información del staff y una imagen predeterminada
    await conn.sendMessage(m.chat, {
      image: { url: global.imageUrl || "https://example.com/imagen-predeterminada.jpg" }, // Imagen predeterminada
      caption: staff,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `🥷 Developers 👑`,
          body: `✨ Staff Oficial`,
          mediaType: 1,
          sourceUrl: global.redes || "https://github.com/Deylinel/TECNO-BOT-OFICIAL", // URL del proyecto
          thumbnailUrl: global.icono || "https://example.com/miniatura-predeterminada.jpg", // Miniatura
        },
      },
    });

    // Reacción al comando (opcional)
    if (global.emoji) {
      await m.react(global.emoji);
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    await m.reply("Ocurrió un error al ejecutar el comando. Por favor, verifica la configuración del bot.");
  }
};

// Configuración del comando
handler.help = ["staff"];
handler.command = ["colaboradores", "staff"];
handler.register = true;
handler.tags = ["main"];

export default handler;