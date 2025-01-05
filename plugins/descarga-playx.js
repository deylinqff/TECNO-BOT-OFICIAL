const { default: makeWASocket, DisconnectReason } = require('@adiwajshing/baileys');
const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');

// Configura tu clave de API de YouTube
const YOUTUBE_API_KEY = 'TU_CLAVE_DE_API';

async function startBot() {
    const sock = makeWASocket();

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0];
        if (!message.message || message.key.fromMe) return;

        const from = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;

        // Comando .playx
        if (text && text.startsWith('.playx ')) {
            const query = text.slice(7).trim();
            if (!query) {
                await sock.sendMessage(from, { text: 'Por favor, indica el nombre o URL de la canción.' });
                return;
            }

            try {
                // Buscar en YouTube
                const video = await searchYouTube(query);
                if (!video) {
                    await sock.sendMessage(from, { text: 'No se encontraron resultados para tu búsqueda.' });
                    return;
                }

                const { title, publishedAt, url, channelTitle, description } = video;

                // Enviar detalles de la canción
                const details = `
🎵 *Título:* ${title}
📅 *Publicado el:* ${new Date(publishedAt).toLocaleDateString()}
⏰ *Hora de publicación:* ${new Date(publishedAt).toLocaleTimeString()}
📺 *Canal:* ${channelTitle}
🔗 *Enlace:* ${url}

📝 *Descripción:* ${description.substring(0, 300)}...
                `;
                await sock.sendMessage(from, { text: details });

                // Descargar y enviar el audio
                const fileName = `./downloads/${Date.now()}.mp3`;
                await downloadAudio(url, fileName);
                await sock.sendMessage(from, {
                    audio: { url: fileName },
                    mimetype: 'audio/mpeg',
                });

                fs.unlinkSync(fileName); // Elimina el archivo después de enviarlo
            } catch (error) {
                console.error(error);
                await sock.sendMessage(from, { text: 'Ocurrió un error al procesar tu solicitud.' });
            }
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada. Reconectando:', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('Conectado a WhatsApp');
        }
    });
}

// Función para buscar en YouTube
async function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=1`;
    const response = await axios.get(url);
    const video = response.data.items[0];
    if (!video) return null;

    const videoId = video.id.videoId;
    const details = {
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description,
    };
    return details;
}

// Función para descargar el audio
function downloadAudio(url, output) {
    return new Promise((resolve, reject) => {
        const stream = ytdl(url, { filter: 'audioonly' }).pipe(fs.createWriteStream(output));
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

// Inicia el bot
startBot();