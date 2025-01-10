
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
            console.error('💛 Error: No image buffer available');
            return conn.reply(m.chat, '💛 Error: No se pudo descargar la imagen.', m, fake);
        }

        const content = '💛 ¿Qué se observa en la imagen?';

        try {
            const imageAnalysis = await fetchImageBuffer(content, img);
            const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
            const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
            const description = await luminsesi(query, username, prompt);

            // Botones interactivos
            const buttons = [
                { buttonId: 'more_info', buttonText: { displayText: 'Más Información' }, type: 1 },
                { buttonId: 'another_image', buttonText: { displayText: 'Otra Imagen' }, type: 1 }
            ];

            await conn.sendMessage(m.chat, {
                text: description,
                buttons: buttons,
                footer: 'Selecciona una opción:',
                headerType: 1
            }, { quoted: m });

        } catch (error) {
            console.error('💛 Error al analizar la imagen:', error);
            await conn.reply(m.chat, '💛 Error al analizar la imagen.', m);
        }

    } else {
        if (!text) {
            return conn.reply(m.chat, `💛 *Ingrese su petición*\n💛 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal);
        }

        await m.react('💬');

        try {
            const query = text;
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
            const response = await luminsesi(query, username, prompt);

            // Botones interactivos
            const buttons = [
                { buttonId: 'more_info', buttonText: { displayText: 'Más Información' }, type: 1 },
                { buttonId: 'another_query', buttonText: { displayText: 'Otra Consulta' }, type: 1 }
            ];

            await conn.sendMessage(m.chat, {
                text: response,
                buttons: buttons,
                footer: 'Selecciona una opción:',
                headerType: 1
            }, { quoted: m });

        } catch (error) {
            console.error('💛 Error al obtener la respuesta:', error);
            await conn.reply(m.chat, 'Error: intenta más tarde.', m);
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
            }
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
        const response = await axios.post("https://Lumin