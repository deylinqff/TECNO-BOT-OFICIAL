import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `🧑‍💻 Ingrese el nombre de alguna canción *YouTube*.`, m, rcanal);
  }

  await m.react('🕒');
  console.log('⏱️ Processing request...');

  try {
    const searchResults = await ytSearch(text);
    if (!searchResults || searchResults.videos.length === 0) {
      console.log('❌ No search results found.');
      throw new Error('No se encontró información de la música.');
    }

    const { title, videoId, thumbnail } = searchResults.videos[0];
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('🔍 Search results:', { title, videoUrl, thumbnail });

    const audioBuffer = await getBuffer(videoUrl);
    if (!audioBuffer) {
      console.log('❌ Audio buffer not found.');
      throw new Error('Error al descargar la música.');
    }

    console.log('🎵 Audio buffer obtained.');

    const txt = `*\`- Y O U T U B E - M U S I C -\`*\n\n`;
    txt += `        ✩  *Título* : ${title}\n`;
    txt += `        ✩  *Url* : ${videoUrl}\n\n`;
    txt += `> 🚩 *${textbot}*`;

    await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m, null, rcanal);
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    console.log('✅ Music sent successfully.');

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error);
    await m.react('❌');
    conn.reply(m.chat, `🚩 Error al descargar la canción. Por favor, intente de nuevo.`, m);
  }
};

const getBuffer = async (videoUrl, options) => {
  try {
    const res = await ytdl(videoUrl, { filter: 'audioonly' });
    const audioBuffer = await new Promise((resolve, reject) => {
      let chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', (err) => reject(err));
    });
    return audioBuffer;
  } catch (e) {
    console.log(`Error : ${e}`);
    return null;
  }
};

handler.help = ['playx *<nombre de la música>*']
handler.tags = ['downloader']
handler.command = ['playx', 'music', 'ytplay', 'youtube']
handler.register = true

export default handler;