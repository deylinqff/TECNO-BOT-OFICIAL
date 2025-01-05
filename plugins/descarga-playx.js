import axios from 'axios';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `🧑‍💻 Ingrese el nombre de alguna canción *Soundcloud*.`, m, rcanal);
  }

  await m.react('🕒');
  console.log('⏱️ Processing request...');

  try {
    const searchUrl = `https://api.soundcloud.com/tracks?client_id=YOUR_CLIENT_ID&q=${encodeURIComponent(text)}`; // Reemplaza 'YOUR_CLIENT_ID' con tu API Key
    const searchResponse = await axios.get(searchUrl);

    if (!searchResponse.data || searchResponse.data.length === 0) {
      console.log('❌ No search results found.');
      throw new Error('No se encontró información de la música.');
    }

    const { title, artwork_url, stream_url } = searchResponse.data[0];
    console.log('🔍 Search results:', { title, artwork_url, stream_url });

    const audioBuffer = await getBuffer(stream_url + '?client_id=YOUR_CLIENT_ID'); // Asegúrate de usar tu API Key aquí también
    if (!audioBuffer) {
      console.log('❌ Audio buffer not found.');
      throw new Error('Error al descargar la música.');
    }

    console.log('🎵 Audio buffer obtained.');

    const txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`;
    txt += `        ✩  *Título* : ${title}\n`;
    txt += `        ✩  *Calidad* : HD\n`; // SoundCloud default is HD
    txt += `        ✩  *Url* : ${stream_url}\n\n`;
    txt += `> 🚩 *${textbot}*`;

    await conn.sendFile(m.chat, artwork_url, 'thumbnail.jpg', txt, m, null, rcanal);
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

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound', 'playx']
handler.register = true

export default handler;