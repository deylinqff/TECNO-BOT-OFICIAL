const ytdl = require('ytdl-core'); // More reliable and secure library
const fs = require('fs'); // For file system operations

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw await m.reply("✨ Ingresa una consulta o link de *YouTube*");
  }
  await m.react('');

  try {
    // Search for YouTube video using yts (optional)
    // let res = await yts(text);
    // let videoList = res.all;
    // let videos = videoList[0];

    // Alternatively, extract URL from text directly
    const url = text.trim(); // Remove leading/trailing spaces

    // Get video info using ytdl-core
    const info = await ytdl.getInfo(url);

    // Choose the highest quality audio format
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    await m.reply('⏳ Descargando tu audio...');

    const writeStream = fs.createWriteStream(`${info.title}.mp3`);
    const stream = ytdl(url, { format });

    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', (error) => {
        console.error('Error downloading audio:', error);
        reject(error);
      });
    });

    // Send audio using sendAudio (better experience)
    await conn.sendMessage(m.chat, { audio: { url: `${info.title}.mp3` }, mimetype: 'audio/mp3', fileName: `${info.title}.mp3` }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error);
    await m.reply('❌ Hubo un problema al descargar el audio. Inténtalo de nuevo más tarde.');
  } finally {
    // Clean up downloaded file (optional)
    // fs.unlinkSync(`${info.title}.mp3`); // Uncomment if you want to delete the file after sending
  }
};

handler.help = ['ytmp3doc <yt url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp3doc'];
handler.register = true;

export default handler;
