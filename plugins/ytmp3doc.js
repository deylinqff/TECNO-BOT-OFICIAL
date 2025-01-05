import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        throw await m.reply("✨ Ingresa una consulta o link de *YouTube*");
    }
    await m.react('🕓');

    // Realiza la búsqueda en YouTube
    let res = await yts(text);
    let videoList = res.all;
    let videos = videoList[0];

    // Función para descargar el audio en MP3
    async function ytdl(url) {
        const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'api_key': 'free',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: url }),
        });

        // Verificación si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error al obtener el video. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    // Solicitar la descarga del audio
    let data_play;
    try {
        data_play = await ytdl(videos.url);
    } catch (error) {
        console.error(error);
        await m.reply("❌ Ocurrió un error al intentar obtener el audio.");
        return;
    }

    // Verifica si la respuesta contiene el enlace al archivo mp3
    if (data_play && data_play.data && data_play.data.mp3) {
        await conn.sendMessage(m.chat, {
            document: { url: data_play.data.mp3 },
            mimetype: 'audio/mp3',
            fileName: `${videos.title}.mp3`,
        }, { quoted: m });

        await m.react('✅');
    } else {
        // En caso de que no se pueda obtener el audio
        await m.reply("❌ No se pudo obtener el audio.");
        await m.react('❌');
    }
};

handler.help = ['ytmp3doc <yt url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp3doc'];
handler.register = true;

export default handler;