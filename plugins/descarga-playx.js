import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `¡Ingresa el nombre de una canción para escuchar en Soundcloud!`, m);

  await m.react('⏳'); // Reacción de búsqueda

  try {
    // ... (resto del código para buscar y descargar la música)

    // Mensaje de confirmación más amigable y seguro
    await conn.reply(m.chat, `¡Listo para escuchar! Aquí tienes tu música:`, m);
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('¡Ups! Algo salió mal. Asegúrate de haber escrito el nombre de la canción correctamente y vuelve a intentarlo.', m);
    await m.react('❌');
  }
};

handler.help = ['playx <canción>'];
handler.tags = ['música'];
handler.command = ['playx'];

export default handler;
