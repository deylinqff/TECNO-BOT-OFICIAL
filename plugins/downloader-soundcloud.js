import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🧑‍💻 INGRESE EL NOMBRE DE ALGUNA CANCIÓN *Soundcloud o YouTube.*`,
      m,
      rcanal
    );
  }

  await m.react('🕒');
  try {
    // Nueva API: Realizar búsqueda en YouTube
    let searchApi = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
        text
      )}&key=TU_CLAVE_DE_API`
    );
    let searchJson = await searchApi.json();
    if (!searchJson.items || !searchJson.items.length) {
      throw new Error('No se encontraron resultados para la búsqueda.');
    }
    let videoId = searchJson.items[0].id.videoId;

    // Descargar el audio usando la API de Siputzx
    let downloadApi = await fetch(
      `https://api.siputzx.my.id/api/d/ytmp3?url=https://www.youtube.com/watch?v=${videoId}`
    );
    let downloadJson = await downloadApi.json();

    if (!downloadJson.data || !downloadJson.data.dl) {
      throw new Error('Error al descargar el audio.');
    }

    let audioUrl = downloadJson.data.dl;

    // Enviar el archivo al usuario
    let audio = await getBuffer(audioUrl);

    let txt = `*\`- Y O U T U B E - M U S I C -\`*\n\n`;
    txt += `        ✩  *Título* : ${searchJson.items[0].snippet.title}\n`;
    txt += `        ✩  *Canal* : ${searchJson.items[0].snippet.channelTitle}\n`;
    txt += `        ✩  *Url* : https://www.youtube.com/watch?v=${videoId}\n\n`;
    txt += `> 🚩 *${textbot}*`;

    await conn.sendFile(
      m.chat,
      searchJson.items[0].snippet.thumbnails.default.url,
      'thumbnail.jpg',
      txt,
      m,
      null,
      rcanal
    );
    await conn.sendMessage(
      m.chat,
      { audio: audio, fileName: `${searchJson.items[0].snippet.title}.mp3`, mimetype: 'audio/mpeg' },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.log(error);
    // Enviar la imagen en caso de error
    await conn.sendFile(
      m.chat,
      'https://files.catbox.moe/yaup2f.webp',
      'error.webp',
      `❌ Ocurrió un error al procesar tu solicitud. Por favor, inténtalo nuevamente más tarde.`,
      m
    );
    await m.react('✖️');
  }
};

handler.help = ['soundcloud *<búsqueda>*', 'ytmusic *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['soundcloud', 'sound', 'play', 'ytmusic'];

export default handler;

const getBuffer = async (url, options) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

/*
//Instalar la dependencia Node-id3 🙃
//Use math por problemas de que algunos audios no se envian
//La segunda url si descarga los datos de la cancion para eso tienes que ingresar a Soundcloud o YouTube la música que quieres descargar e ingresar el enlace.
//Aún falta mejorar la integración con el buscador.
import axios from 'axios'
import fs from 'fs'
import nodeID3 from 'node-id3'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `🚩 Ingrese el nombre de la canción de *Soundcloud o YouTube.*`, m, rcanal)
await m.react('🕓')
try {
let { data: results } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${text}`, { headers: { 'Content-Type': 'application/json' } })
let randoms = results[Math.floor(Math.random() * results.length)]
let { data: sm } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${randoms.url}`, { headers: { 'Content-Type': 'application/json' }})
let mpeg = await axios.get(sm.audio, { responseType: 'arraybuffer' })
let img = await axios.get(randoms.image, { responseType: 'arraybuffer' })
let mp3 = `${sm.title}.mp3`
fs.writeFileSync(mp3, Buffer.from(mpeg.data))
let tags = {
title: sm.title,
artist: sm.creator, 
image: Buffer.from(img.data) 
}
nodeID3.write(tags, mp3)
let txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`
txt += `🍘• *Nombre:* ${randoms.title}\n`
txt += `🍘• *Artista:* ${randoms.artist}\n`
txt += `🍘• *Duración:* ${randoms.duration}\n`
txt += `🍘• *Reproducciones:* ${randoms.repro}\n`
txt += `🍘• *Link:* ${randoms.url}\n\n`
txt += `🚩 Powered By Starlights Team`
await conn.sendFile(m.chat, randoms.image, 'thumb.jpg', txt, m)
await conn.sendMessage(m.chat, { audio: fs.readFileSync(mp3), fileName: `${sm.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
fs.unlinkSync(mp3)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['soundcloud *<búsqueda>*', 'ytmusic *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound', 'play', 'ytmusic']
handler.register = true
//handler.limit = 3
export default handler*/