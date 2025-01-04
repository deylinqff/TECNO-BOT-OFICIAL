const handler = async (m, { isOwner, isAdmin, conn }) => {
  // Verifica si el usuario es administrador o propietario en grupos
  if (m.isGroup && !(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Mensaje de venta de bots
  const teks = `⇢𝐓𝐄𝐂𝐍𝐎-𝐁𝐎𝐓 : 𝐕𝐄𝐍𝐓𝐀 𝐃𝐄 𝐁𝐎𝐓𝐒\n\n1 𝐛𝐨𝐭 ➤ 𝟑𝟎𝟎 𝐝𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬\n2 𝐛𝐨𝐭𝐬 ➤ 𝟔𝟎𝟎 𝐝𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬\n\n¡𝐏𝐚𝐫𝐚 𝐦á𝐬 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢ó𝐧, 𝐜𝐨𝐧𝐭á𝐜𝐭𝐚𝐦𝐞! 🚀\n\n╔═══════•| 🚀 |•═══════╗\n╚═══════•| 🚀 |•═══════╝`;

  // URL de la imagen
  const imageUrl = 'https://files.catbox.moe/i9zyaz.jpg';

  // Envía la imagen con el texto como pie de foto (caption)
  await conn.sendMessage(
    m.chat,
    {
      image: { url: imageUrl }, // Imagen a enviar
      caption: teks, // Texto como pie de foto
    }
  );
};

handler.help = ['vendo'];
handler.tags = ['tools'];
handler.command = /^(vendo)$/i; // Comando actualizado
handler.admin = false; // No requiere ser administrador
handler.group = false; // Puede usarse en chats personales y grupos

export default handler;