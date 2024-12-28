import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*\`💻 Ingrese el enlace del video para descargar 🚀\n\n✨ Ejemplo .fb https://www.facebook.com/share/r/Zg7ye3TwwvkbW1gQ./\`🚀', m, fake);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*`🚨 ¡Error al obtener datos! Verifica el enlace e intenta nuevamente.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*`⚠️ No se encontraron resultados para este enlace.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, '*`🔍 ¡Error al procesar los datos! Por favor, intenta más tarde.`*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*`❌ No se encontró una resolución adecuada.`*', m);
  }

  await m.react('✅');
  let video = data.url;

  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return conn.reply(m.chat, '*`⚡ ¡Error al enviar el video! Intenta nuevamente.`*', m);
    await m.react('❌');
  }
};

handler.help = ['fb *<link>*'];
handler.corazones = 2;
handler.tags = ['dl'];
handler.command = /^(fb|facebook|fbdl)$/i;
handler.register = true;

export default handler;