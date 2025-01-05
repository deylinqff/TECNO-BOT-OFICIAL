const ytdl = require('ytdl-core'); // Reemplaza con la biblioteca que elijas

// ... (resto del código)

async function ytdl(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    await m.reply('⏳ Descargando tu audio...');

    const stream = ytdl(url, { format });
    const writeStream = fs.createWriteStream(`${videos.title}.mp3`);

    stream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  } catch (error) {
    console.error('Error al descargar el audio:', error);
    await m.reply('❌ Hubo un problema al descargar el audio. Por favor, inténtalo de nuevo más tarde.');
    throw error;
  }
}
