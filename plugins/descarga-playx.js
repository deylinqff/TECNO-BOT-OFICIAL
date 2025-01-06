import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🧑‍💻 Ingrese el nombre de alguna canción de *Soundcloud*.`, m, { quoted: m });

    await m.react('🕒');
    try {
        // Fetch the search results from the API
        let api = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (!json.length) throw new Error('No se encontraron resultados');

        let { url } = json[0];

        // Fetch the download link from the API
        let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
        let json2 = await api2.json();
        if (!json2.link) throw new Error('No se pudo obtener el enlace de descarga');

        let { link: dl_url, quality, image } = json2;

        // Download the audio file
        let audio = await getBuffer(dl_url);

        // Prepare the message text
        let txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`;
        txt += `        ✩  *Título* : ${json[0].title}\n`;
        txt += `        ✩  *Calidad* : ${quality}\n`;
        txt += `        ✩  *Url* : ${url}\n\n`;
        txt += `> 🚩 *${textbot}*`;

        // Send the thumbnail image and message text
        await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null, { quoted: m });

        // Send the audio file
        await conn.sendMessage(m.chat, { audio: audio, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

        // React with a success emoji
        await m.react('✅');
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m, { quoted: m });
        await m.react('✖️');
    }
};

handler.help = ['soundcloud *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['playx']; // Cambiado a .playx

export default handler;

// Helper function to get the audio buffer
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
        throw new Error('No se pudo descargar el audio');
    }
};