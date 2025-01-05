const { MessageType } = require('@adiwajshing/baileys'); // Asegúrate de tener esta dependencia instalada

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        return m.reply('¡Por favor, ingresa la URL del video de YouTube después del comando! Por ejemplo: .ytmp3doc https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }

    const [_, url] = text.split(' ');

    // ... (resto del código, como lo tienes ahora)

    // En lugar de enviar como documento, puedes usar sendAudio para una mejor experiencia
    await conn.sendMessage(m.chat, { audio: { url: data_play.data.mp3 }, mimetype: 'audio/mp3', fileName: `${videos.title}.mp3` }, { quoted: m });
};

handler.command = ['ytmp3doc'];
// ... (resto de las propiedades del handler)

module.exports = handler;
