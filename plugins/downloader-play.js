import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `🚀 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`, m);
  }

  const isAudioCommand = command === 'play' || command === 'mp3';
  const isVideoCommand = command === 'play2' || command === 'mp4';

  if (isAudioCommand || isVideoCommand) {
    try {
      await m.react('⌛');
      const yt_play = await search(args.join(' '));
      const videoDetails = yt_play[0];

      const texto = `
        *_𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕_*
        > 📚 *Título:*
        » ${videoDetails.title}
        > 📆 *Publicado:* 
        » ${videoDetails.ago}
        > 🕒 *Duración:* 
        » ${secondString(videoDetails.duration.seconds)}
        > 👀 *Vistas:* 
        » ${MilesNumber(videoDetails.views)}
        > 👤 *Autor:* 
        » ${videoDetails.author.name}
        > 🔗 *Enlace:*
        » ${videoDetails.url}
        > 📽️ *Su ${isAudioCommand ? 'Audio' : 'Video'} se está enviando, espere un momento...*
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: videoDetails.thumbnail },
        caption: texto,
        contextInfo: {
          externalAdReply: {
            title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
            body: '𝐓𝐞𝐜𝐧𝐨',
            sourceUrl: videoDetails.url,
            thumbnail: videoDetails.thumbnail,
          },
        },
        quoted: m,
      });

      const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoDetails.url)}`;
      const apiResponse = await fetch(apiUrl);
      const delius = await apiResponse.json();

      if (!delius.status) {
        throw new Error('API response status is false');
      }

      const downloadUrl = delius.data.download.url;
      const fileSize = await getFileSize(downloadUrl);

      if (isAudioCommand) {
        if (fileSize > LimitAud) {
          await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${videoDetails.title}.mp3` }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
        }
      } else {
        if (fileSize > LimitVid) {
          await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${videoDetails.title}.mp4`, caption: `🚀 Aquí está tu video.` }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${videoDetails.title}.mp4`, caption: `⚙️ Aquí está tu video.`, thumbnail: videoDetails.thumbnail, mimetype: 'video/mp4' }, { quoted: m });
        }
      }

      await m.react('✅');
    } catch (error) {
      console.error('Error:', error);
      await m.react('❌');
    }
  }
};

handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2', 'play3', 'play4', 'mp3', 'mp4', 'playdoc', 'playdoc2'];
handler.group = true;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error('Error al obtener el buffer', error);
    throw new Error('Error al obtener el buffer');
  }
};

async function getFileSize(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
  } catch (error) {
    console.error('Error al obtener el tamaño del archivo', error);
    return 0;
  }
}