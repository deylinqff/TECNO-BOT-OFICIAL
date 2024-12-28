const venom = require('venom-bot');
const fbDownloader = require('facebook-video-downloader');

venom
  .create()
  .then(client => start(client))
  .catch(err => console.log(err));

function start(client) {
  client.onMessage(async message => {
    // Verifica si el mensaje contiene el comando .fb seguido de una URL
    if (message.body.startsWith('.fb ')) {
      const fbUrl = message.body.split(' ')[1]; // Obtén la URL después del comando
      
      if (!isValidUrl(fbUrl)) {
        client.sendText(message.from, 'Por favor, proporciona una URL válida de Facebook.');
        return;
      }

      try {
        // Descarga el video usando la librería
        const videoInfo = await fbDownloader(fbUrl);

        if (videoInfo && videoInfo.sd || videoInfo.hd) {
          // Usa el enlace SD o HD del video
          const videoLink = videoInfo.hd || videoInfo.sd;
          
          // Envía el video al usuario
          await client.sendFileFromUrl(
            message.from,
            videoLink,
            'video.mp4',
            'Aquí está tu video de Facebook.'
          );
        } else {
          client.sendText(message.from, 'No se pudo descargar el video. Asegúrate de que el enlace sea público.');
        }
      } catch (error) {
        console.error(error);
        client.sendText(message.from, 'Hubo un error al procesar tu solicitud. Intenta nuevamente.');
      }
    }
  });
}

// Función para validar URLs
function isValidUrl(url) {
  const regex = /(https?:\/\/)?(www\.)?(facebook\.com)\/.+/;
  return regex.test(url);
}