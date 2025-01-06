import axios from 'axios';
import fetch from 'node-fetch';
import textToSpeech from '@google-cloud/text-to-speech';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
  const username = `${conn.getName(m.sender)}`;
  const basePrompt = `Tu nombre es CrowBot y parece haber sido creado por WillZek. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertido, te encanta aprender y sobre todo las explosiones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

  // Función para convertir texto a audio
  const tts = async (text, lang = 'es') => {
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
      input: { text },
      voice: {
        languageCode: lang,
        name: 'es-ES-Wavenet-B',
        ssmlGender: 'MALE',
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const filePath = join('/tmp', `${Date.now()}.mp3`);
    writeFileSync(filePath, response.audioContent, 'binary');
    return filePath;
  };

  if (isQuotedImage) {
    const q = m.quoted;
    const img = await q.download?.();
    if (!img) {
      return conn.reply(m.chat, '💛 Error: No se pudo descargar la imagen.', m);
    }

    const content = '💛 ¿Qué se observa en la imagen?';
    try {
      const imageAnalysis = await fetchImageBuffer(content, img);
      const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
      const description = await luminsesi(query, username, prompt);
      const audioPath = await tts(description, 'es');
      await conn.sendFile(m.chat, audioPath, 'respuesta.mp3', null, m, true);
      unlinkSync(audioPath); // Limpia el archivo temporal
    } catch (error) {
      await conn.reply(m.chat, '💛 Error al analizar la imagen.', m);
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `💛 *Ingrese su petición*\n💛 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m);
    }

    try {
      const query = text;
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
      const response = await luminsesi(query, username, prompt);
      const audioPath = await tts(response, 'es');
      await conn.sendFile(m.chat, audioPath, 'respuesta.mp3', null, m, true);
      unlinkSync(audioPath); // Limpia el archivo temporal
    } catch (error) {
      await conn.reply(m.chat, '💛 Error: intenta más tarde.', m);
    }
  }
};

handler.help = ['chatgpt <texto>', 'voz <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['voz', 'chatgpt', 'voz', 'chat', 'gpt'];

export default handler;

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al analizar la imagen.');
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false,
    });
    return response.data.result;
  } catch (error) {
    throw new Error('Error al obtener la respuesta de la IA.');
  }
}