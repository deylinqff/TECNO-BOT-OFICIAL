import axios from 'axios';
import fetch from 'node-fetch';

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

        try {
            const imageAnalysis = await analyzeImage(img); // Reemplazo de la función de análisis
            const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres.';
            const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis}`;
            const description = await askGPT(query, username, prompt);

            await conn.sendMessage(m.chat, {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' }, // Puedes cambiar la URL a una imagen específica
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

        await m.react('🤔');

        try {
            const query = text;
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
            const response = await askGPT(query, username, prompt);

            await conn.sendMessage(m.chat, {
                image: { url: 'https://files.catbox.moe/adcnsj.jpg' }, // Cambiar si es necesario
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

// Función para analizar la imagen con una API (puedes personalizar esta parte)
async function analyzeImage(imageBuffer) {
    // Aquí puedes usar una API confiable como Google Vision, AWS Rekognition o Cloudinary.
    try {
        // Ejemplo con Cloudinary (requiere configuración previa)
        const response = await axios.post('https://api.cloudinary.com/v1_1/tu_cuenta/image/upload', {
            file: imageBuffer,
            upload_preset: 'preset_configurado'
        });
        return response.data.url;
    } catch (error) {
        console.error('Error al analizar la imagen:', error);
        throw error;
    }
}

// Función para interactuar con OpenAI GPT-4
async function askGPT(q, username, logic) {
    const openaiApiKey = 'TU_CLAVE_API_OPENAI';
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4',
            prompt: logic,
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('⚠️ Error al procesar la solicitud con OpenAI:', error);
        throw error;
    }
}