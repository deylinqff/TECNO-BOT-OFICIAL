// Elimina el import de fetch si no lo usas
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
    const username = `${conn.getName(m.sender)}`;
    const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo las explosiones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

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

            const buttons = [
                { buttonText: { displayText: '👍 Aceptar' }, type: 1, id: 'accept' },
                { buttonText: { displayText: '👎 Rechazar' }, type: 1, id: 'reject' }
            ];

            const buttonMessage = {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' },
                caption: description,
                buttons,
                headerType: 4
            };

            await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        } catch (error) {
            console.error('⚠️ Error al procesar la imagen:', error);
            await conn.reply(m.chat, '⚠️ Ocurrió un problema al analizar la imagen. Por favor, inténtalo más tarde.', m);
        }
    } else {
        if (!text) {
            return conn.reply(m.chat, `⚠️ *Falta texto para procesar tu solicitud.*\n\n📝 Ejemplo de uso: \n${usedPrefix + command} ¿Cómo se hace un avión de papel?`, m);
        }

        await m.react('🤔');

        try {
            const query = text;
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
            const response = await luminsesi(query, username, prompt);

            const buttons = [
                { buttonText: { displayText: '👍 Aceptar' }, type: 1, id: 'accept' },
                { buttonText: { displayText: '👎 Rechazar' }, type: 1, id: 'reject' }
            ];

            const buttonMessage = {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' },
                caption: response,
                buttons,
                headerType: 4
            };

            await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        } catch (error) {
            console.error('⚠️ Error al obtener la respuesta:', error);
            await conn.reply(m.chat, '⚠️ Lo siento, no pude procesar tu solicitud. Por favor, inténtalo más tarde.', m);
        }
    }
};

async function fetchImageBuffer(content, imageBuffer) {
    try {
        const base64Image = imageBuffer.toString('base64');  // Convierte la imagen a base64
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: base64Image  // Envía la imagen en formato base64
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error al analizar la imagen:', error);
        throw error;
    }
}

async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        }, {
            timeout: 10000
        });
        return response.data.result;
    } catch (error) {
        console.error('⚠️ Error al procesar la solicitud:', error);
        throw error;
    }
}

export default handler;