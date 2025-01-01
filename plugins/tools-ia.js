import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
  const username = `${conn.getName(m.sender)}`;
  const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo las explociones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

  if (isQuotedImage) {
    const q = m.quoted;
    const img = await q.download?.();

    if (!img) {
      console.error('💛 Error: No image buffer available');
      return conn.reply(m.chat, '💛 Error: No se pudo descargar la imagen.', m);
    }

    const content = '💛 ¿Qué se observa en la imagen?';

    try {
      const imageAnalysis = await fetchImageBuffer(content, img);
      const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
      const description = await luminsesi(query, username, prompt);

      await conn.sendMessage(m.chat, {
        image: { url: imageAnalysis.imageUrl },
        caption: description,
      });
    } catch (error) {
      console.error('💛 Error al analizar la imagen:', error);
      await conn.reply(m.chat, '💛 Error al analizar la imagen.', m);
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `💛 *Ingrese su petición*\n💛 *Ejemplo de uso:* ${usedPrefix + command} Genera una imagen de un dragón volando`, m);
    }

    if (command === 'generarimagen') {
      await m.react('🎨');
      try {
        const imageUrl = await generateImage(text);
        await conn.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `Imagen generada basada en tu descripción: "${text}"`,
        });
      } catch (error) {
        console.error('💛 Error al generar la imagen:', error);
        await conn.reply(m.chat, '💛 Error al generar la imagen.', m);
      }
    } else {
      await m.react('💬');
      try {
        const query = text;
        const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
        const response = await luminsesi(query, username, prompt);

        await conn.reply(m.chat, response, m);
      } catch (error) {
        console.error('💛 Error al obtener la respuesta:', error);
        await conn.reply(m.chat, 'Error: intenta más tarde.', m);
      }
    }
  }
};

handler.help = ['chatgpt <texto>', 'ia <texto>', 'generarimagen <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['ia', 'chatgpt', 'ai', 'chat', 'gpt', 'generarimagen'];
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
    console.error('Error:', error);
    throw error;
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false,
    });

    return response.data.result;
  } catch (error) {
    console.error('💛 Error al obtener:', error);
    throw error;
  }
}

// Función para generar imágenes basadas en texto
async function generateImage(prompt) {
  try {
    const response = await axios.post('https://api.example.com/generate-image', {
      prompt: prompt,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // La API devuelve una URL de la imagen generada
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error al generar imagen:', error);
    throw error;
  }
}