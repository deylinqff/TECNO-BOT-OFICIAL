import axios from 'axios';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, '🧑‍💻 Ingrese el nombre de alguna canción *YouTube*.', m, rcanal);
  }

  await m.react('🕒');
  console.log('⏱️ Processing request...');

  try {
    // Step 1: Search for the song on YouTube
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(text)}&type=video&key=YOUR_API_KEY`; // Replace 'YOUR_API_KEY' with your actual API key
    let searchResponse = await axios.get(searchUrl);

    if (!searchResponse.data.items.length) {
      console.log('❌ No search results found.');
      throw new Error('No se encontró información de la música.');
    }

    let { title, videoId, thumbnails } = searchResponse.data.items[0].snippet;
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('🔍 Search results:', { title, videoUrl, thumbnails });

    // Step 2: Use a YouTube to MP3 conversion API
    let downloadUrl = `https://api.vevioz.com/api/button/mp3/${videoId}`; // Replace with a working video-to-MP3 conversion API
    let downloadResponse = await axios.get(downloadUrl);

    // Extract MP3 download URL from response
    let match = downloadResponse.data.match(/<a href="([^"]+)">Download MP3<\/a>/);
    if (!match) {
      console.log('❌ Download link not found.');
      throw new Error('Error al obtener el enlace de descarga.');
    }

    let mp3Url = match[1];
    console.log('🎵 MP3 download link obtained:', mp3Url);

    // Step 3: Download the MP3 audio
    let audioBuffer = await getBuffer(mp3Url);
    if (!audioBuffer) {
      console.log('❌ Audio buffer not found.');
      throw new Error('Error al descargar la música.');
    }

    console.log('🎵 Audio buffer obtained.');

    // Step 4: Send the audio and details back to the user
    let txt = `*\`- Y O U T U B E - M U S I C -\`*\n\n`;
    txt += `        ✩  *Título* : ${title}\n`;
    txt += `        ✩  *Url* : ${videoUrl}\n\n`;
    txt += `> 🚩 *${textbot}*`;

    await conn.sendFile(m.chat, thumbnails.default.url, 'thumbnail.jpg', txt, m, null, rcanal);
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    console.log('✅ Music sent successfully.');

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error);
    await m.react('❌');
    conn.reply(m.chat, '🚩 Error al descargar la canción. Por favor, intente de nuevo.', m);
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
    console.log(`Error: ${e}`);
    return null;
  }
};

handler.help = ['playx *<nombre de la música>*']
handler.tags = ['downloader']
handler.command = ['playx', 'music', 'ytplay', 'youtube']
handler.register = true

export default handler;