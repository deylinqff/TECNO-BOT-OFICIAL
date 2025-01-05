import axios from 'axios';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `🧑‍💻 Ingrese el nombre de alguna canción *YouTube*.`, m, rcanal);
  }

  await m.react('🕒');
  console.log('⏱️ Processing request...');

  try {
    // Step 1: Search for the song on YouTube
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(text)}&type=video&key=YOUR_API_KEY`;
    let searchResponse = await axios.get(searchUrl);
    let searchData = searchResponse.data.items[0];

    if (!searchData) {
      console.log('❌ No search results found.');
      throw new Error('No se encontró información de la música.');
    }

    let { title, videoId } = searchData.snippet;
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Step 2: Use a YouTube to MP3 conversion API
    let downloadUrl = `https://api.example.com/youtube2mp3?v=${videoId}`; // Replace 'api.example.com' with a working API
    let downloadResponse = await axios.get(downloadUrl);
    let downloadData = downloadResponse.data;

    if (!downloadData || !downloadData.url) {
      console.log('❌ Download data not found.');
      throw new Error('Error al obtener el enlace de descarga.');
    }

    let audioBuffer = await getBuffer(downloadData.url);
    if (!audioBuffer) {
      console.log('❌ Audio buffer not found.');
      throw new Error('Error al descargar la música.');
    }

    console.log('🎵 Audio buffer obtained.');

    let txt = `*\`- Y O U T U B E - M U S I C -\`*\n\n`;
    txt += `        ✩  *Título* : ${title}\n`;
    txt += `        ✩  *Url* : ${videoUrl}\n\n`;
    txt += `> 🚩 *${textbot}*`;

    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    console.log('✅ Music sent successfully.');

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error);
    await m.react('❌');
    conn.reply(m.chat, `🚩 Error al descargar la canción. Por favor, intente de nuevo.`, m);
  }
};

const getBuffer = async (url, options) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
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