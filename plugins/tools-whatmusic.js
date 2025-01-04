import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m; // Mensaje citado o mensaje actual
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    
    // Validar si el archivo es de tipo audio o video
    if (!/video|audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `🍭 Etiqueta un audio o video de poca duración con el comando *${usedPrefix + command}* para identificar la música.`,
        m
      );
    }
    
    // Descargar el archivo adjunto
    const buffer = await q.download();
    if (!buffer) throw 'No se pudo descargar el archivo. Por favor, inténtalo de nuevo.';

    // Identificar el audio o video usando ACRCloud
    const { status, metadata } = await acr.identify(buffer);
    if (status.code !== 0) throw status.msg;

    const music = metadata.music[0]; // Información del primer resultado
    if (!music) throw 'No se encontró información sobre la música en el archivo proporcionado.';

    const { title, artists, album, genres, release_date } = music;

    // Crear respuesta
    let txt = '╭─⬣「 *Whatmusic Tools* 」⬣\n';
    txt += `│  ≡◦ *🍭 Título ∙* ${title}\n`;
    if (artists) txt += `│  ≡◦ *👤 Artista ∙* ${artists.map((v) => v.name).join(', ')}\n`;
    if (album) txt += `│  ≡◦ *📚 Álbum ∙* ${album.name}\n`;
    if (genres) txt += `│  ≡◦ *🪴 Género ∙* ${genres.map((v) => v.name).join(', ')}\n`;
    if (release_date) txt += `│  ≡◦ *🕜 Fecha de lanzamiento ∙* ${release_date}\n`;
    txt += '╰─⬣';

    // Enviar respuesta
    conn.reply(m.chat, txt, m);
  } catch (error) {
    // Manejo de errores
    conn.reply(
      m.chat,
      `❌ Ocurrió un error: ${typeof error === 'string' ? error : 'Intenta nuevamente más tarde.'}`,
      m
    );
  }
};

// Configuración del comando
handler.help = ['whatmusic <audio/video>'];
handler.tags = ['tools'];
handler.command = /^(whatmusic|shazam)$/i;
// handler.limit = 1; // Descomenta si quieres limitar el uso
handler.register = true;

export default handler;