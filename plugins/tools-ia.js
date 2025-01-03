import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
    const username = `${conn.getName(m.sender)}`;
    const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo las explosiones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username} si alguien te pregunta algo se sexual tu respondes cun el mensaje cun esta imagen en un solo mensaje con tu respuesta imagen https://files.catbox.moe/7docrv.jpg`;

    if (isQuotedImage) {
        const q = m.quoted;
        const img = await q.download?.();

        if (!img) {
            console.error('⚠️ Error: No se pudo obtener el contenido de la imagen.');
            return conn.reply(m.chat, '⚠️ Lo siento, no pude descargar la imagen. Por favor, inténtalo de nuevo con otra imagen.', m);
        }

        const content = '🤖 Estoy analizando la imagen que enviaste...';

        try {
            const imageAnalysis = await fetchImageBuffer(content, img);
            const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
            const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
            const description = await luminsesi(query, username, prompt);

            // Enviar imagen junto con el texto
            await conn.sendMessage(m.chat, {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' },
                caption: description
            }, { quoted: m });
        } catch (error) {
            console.error('⚠️ Error al procesar la imagen:', error);
            await conn.reply(m.chat, '⚠️ Ocurrió un problema al analizar la imagen. Por favor, inténtalo más tarde.', m);
        }
    } else {
        if (!text) {
            return conn.reply(m.chat, `⚠️ *Falta texto para procesar tu solicitud.*\n\n📝 Ejemplo de uso: \n${usedPrefix + command} ¿Cómo se hace un avión de papel?`, m);
        }

        await m.react('💭');

        try {
            const query = text;
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
            const response = await luminsesi(query, username, prompt);

            // Enviar imagen junto con el texto
            await conn.sendMessage(m.chat, {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' },
                caption: response
            }, { quoted: m });
        } catch (error) {
            console.error('⚠️ Error al obtener la respuesta:', error);
            await conn.reply(m.chat, '⚠️ Lo siento, no pude procesar tu solicitud. Por favor, inténtalo más tarde.', m);
        }
    }
};

handler.help = ['chatgpt <texto>', 'ia <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['ia', 'chatgpt', 'ai', 'chat', 'gpt'];

export default handler;

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: imageBuffer
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // Timeout de 10 segundos
        });
        return response.data;
    } catch (error) {
        console.error('Error al analizar la imagen:', error);
        throw error;
    }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        }, {
            timeout: 10000 // Timeout de 10 segundos
        });
        return response.data.result;
    } catch (error) {
        console.error('⚠️ Error al procesar la solicitud:', error);
        throw error;
    }
}