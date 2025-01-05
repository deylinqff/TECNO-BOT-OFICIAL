const { Client, LocalAuth } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

// Inicializa el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body.startsWith('.Ytmp3doc ')) {
        const url = msg.body.split(' ')[1];
        if (ytdl.validateURL(url)) {
            const videoInfo = await ytdl.getInfo(url);
            const title = videoInfo.videoDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filePath = path.resolve(__dirname, `${title}.mp3`);

            msg.reply('Descargando tu video, por favor espera...');

            ytdl(url, {
                filter: 'audioonly',
                format: 'mp3'
            }).pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                msg.reply('Descarga completada, enviando el archivo...');
                client.sendMessage(msg.from, fs.createReadStream(filePath), {
                    filename: `${title}.mp3`,
                    sendMediaAsDocument: true
                }).then(() => {
                    fs.unlinkSync(filePath); // Elimina el archivo después de enviarlo
                }).catch(error => {
                    console.error('Error al enviar el archivo:', error);
                    msg.reply('Hubo un error al enviar el archivo.');
                });
            })
            .on('error', (error) => {
                console.error('Error al descargar el video:', error);
                msg.reply('Hubo un error al descargar el video.');
            });
        } else {
            msg.reply('Por favor, proporciona una URL de YouTube válida.');
        }
    }
});

client.initialize();