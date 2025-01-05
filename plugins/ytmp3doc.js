import yts from 'yt-search';
import fetch from 'node-fetch';

// (Optional) Encapsulate API logic in a service class
class AudioDownloader {
  async downloadAudio(url) {
    const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'api_key': 'free',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: url
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw await m.reply("✨ Ingresa una consulta o link de *YouTube*");
  }
  await m.react('');

  try {
    let res = await yts(text);
    let videoList = res.all;
    let videos = videoList[0];

    const audioDownloader = new AudioDownloader(); // (Optional)
    const data_play = await audioDownloader.downloadAudio(videos.url); // (Optional) or directly call downloadAudio()

    if (data_play && data_play.data && data_play.data.mp3) {
      await conn.sendMessage(m.chat, {
        document: { url: data_play.data.mp3 },
        mimetype:
