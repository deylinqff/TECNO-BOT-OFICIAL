const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const oi = `⇢𝐓𝐄𝐂𝐍𝐎-𝐁𝐎𝐓 : ${pesan}`;
  let teks = ` 𝒊𝒏𝒃𝒐𝒄𝒂𝒏𝒅𝒐 𝒈𝒓𝒖𝒑𝒐\n⧼P̼⧽= ${participants.length} 𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬\n\n${oi}\n\n╔═══════•| 🚀 |•═══════╗\n`;

  for (const mem of participants) {
    teks += `╠ ✰➥. @${mem.id.split('@')[0]}\n`;
  }

  teks += `╚═══════•| 🚀 |•═══════╝`;

  const imageUrl = 'https://files.catbox.moe/i9zyaz.jpg'; // Cambia esto a la URL de tu imagen

  conn.sendMessage(
    m.chat, 
    {
      text: teks,
      mentions: participants.map((a) => a.id),
      image: {url: imageUrl}, // Incluye la imagen
      caption: teks // Texto como pie de imagen
    }
  );
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;