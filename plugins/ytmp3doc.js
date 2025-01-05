import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw await m.reply("✨ Ingresa una consulta o link de *YouTube*");
  }
  await m.react('');

  try {
    let res = await yts(text);
    let videoList = res.all;
    let videos = videoList[0];

    async function ytdl(url) {
      const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'api_key': 'free', // Consider paid/licensed API for better reliability
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: url
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check for valid MP3 URL and other potential errors
      if (!data.data || !data.data.mp3) {
        throw new Error('No valid MP3 download URL found in API response.');
      }

      return data.data.mp3;
    }

    let audioUrl = await ytdl(videos.url);
    console.log("Audio URL:", audioUrl);

    // **Alternative Approach (if WhatsApp allows external downloads):**
    // const audioResponse = await fetch(audioUrl);
    // if (!audioResponse.ok) {
    //   throw new Error('Error downloading audio file.');
    // }
    // const audioBuffer = await audioResponse.arrayBuffer();

    // **Sending Audio within WhatsApp Limitations:**
    // Explore WhatsApp's capabilities for sending audio files directly
    // or uploading them to a temporary storage solution.

    await m.react('✅');
    await m.reply("✨ ¡Descarga exitosa! (pendiente de implementación de envío)"); // Placeholder message
  } catch (error) {
    console.error("Error:", error);
    await m.react('❌');
    await m.reply("❌ No se pudo obtener el audio. Intenta de nuevo más tarde.");
  }
};

handler.help = ['ytmp3doc <yt url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp3doc'];
handler.register = true;

export default handler;
