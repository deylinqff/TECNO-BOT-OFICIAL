const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  // Evita el uso de ciertos prefijos
  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  // Verifica si el usuario es administrador o propietario
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Mensaje personalizado
  const pesan = args.join(' ');
  const oi = `⇢𝐓𝐄𝐂𝐍𝐎-𝐁𝐎𝐓 : ${pesan}`;
  let teks = `𝑰𝒏𝒗𝒐𝒄𝒂𝒏𝒅𝒐 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐\n⧼P̼⧽= ${participants.length} 𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬\n\n${oi}\n\n╔═══════•| 🚀 |•═══════╗\n`;

  // Agrega menciones para cada participante
  for (const mem of participants) {
    teks += `╠ ✰➥. @${mem.id.split('@')[0]}\n`;
  }

  teks += `╚═══════•| 🚀 |•═══════╝`;

  // URL de la imagen
  const imageUrl = 'https://files.catbox.moe/i9zyaz.jpg';

  // Envía la imagen con el texto como pie de foto (caption) y menciones
  await conn.sendMessage(
    m.chat,
    {
      image: { url: imageUrl }, // Imagen a enviar
      caption: teks, // Texto como pie de foto
      mentions: participants.map((a) => a.id), // Menciones
    }
  );
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler; 