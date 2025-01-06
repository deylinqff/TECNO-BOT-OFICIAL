/* Código creado por Deylin */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const username = `${conn.getName(m.sender)}`;
    const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo el anime. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

    // Palabras clave y categorías
    const sexualKeywords = ["sexo", "sexual", "pornografía", "erótico", "erotismo", "sensual", "relación íntima", "porno", "pene", "vrg", "gay", "gey"];
    const gamesKeywords = ["juego", "videojuego", "gaming", "consola", "pc", "playstation", "xbox", "nintendo", "gamer"];
    const adventureKeywords = ["aventura", "explorar", "exploración", "viajar", "mundo", "misión", "acción"];

    // Imágenes relacionadas con las categorías
    const normalImage = "https://files.catbox.moe/g95ury.jpg";
    const sexualImage = "https://files.catbox.moe/7docrv.jpg";
    const gamesImage = "https://files.catbox.moe/ijdc93.jpg";
    const adventureImage = "https://files.catbox.moe/yewq55.jpg";

    if (!text) {
        return conn.reply(m.chat, `⚠️ *Falta texto para procesar tu solicitud.*\n\n📝 Ejemplo de uso: \n${usedPrefix + command} ¿Cómo se hace un avión de papel?`, m);
    }

    // Mostrar que está "pensando"
    await m.react('💭');

    try {
        const query = text;
        const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
        const response = await luminsesi(query, username, prompt);

        // Verificar si la IA devuelve una respuesta válida
        if (!response || response.trim() === '') {
            return conn.reply(m.chat, '⚠️ La IA no respondió con un texto válido. Por favor, inténtalo nuevamente.', m);
        }

        // Detectar la categoría del texto ingresado
        const isSexual = sexualKeywords.some(keyword => query.toLowerCase().includes(keyword));
        const isGame = gamesKeywords.some(keyword => query.toLowerCase().includes(keyword));
        const isAdventure = adventureKeywords.some(keyword => query.toLowerCase().includes(keyword));

        let imageUrl = normalImage; // Imagen por defecto
        if (isSexual) {
            imageUrl = sexualImage;
        } else if (isGame) {
            imageUrl = gamesImage;
        } else if (isAdventure) {
            imageUrl = adventureImage;
        }

        // Convertir la respuesta a audio
        const audioBuffer = await textToSpeech(response);

        // Guardar el archivo de audio
        const audioPath = path.join(__dirname, 'response.mp3');
        fs.writeFileSync(audioPath, audioBuffer);

        // Responder con audio e imagen
        await conn.sendMessage(m.chat, {
            audio: { url: audioPath },
            caption: response
        }, { quoted: m });

        // Eliminar archivo de audio después de enviarlo
        fs.unlinkSync(audioPath);
    } catch (error) {
        console.error('⚠️ Error al procesar la solicitud:', error);
        await conn.reply(m.chat, '⚠️ Lo siento, no pude procesar tu solicitud. Por favor, inténtalo más tarde.', m);
    }
};

handler.help = ['chatgpt <texto>', 'voz <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['voz', 'chatgpt', 'voz', 'chat', 'gpt'];

export default handler;

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
    try {
        console.log(`Consultando IA con el query: ${q}`);
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        }, {
            timeout: 10000
        });

        // Asegurarse de que la respuesta de la IA no esté vacía
        if (!response.data || !response.data.result) {
            throw new Error('No se recibió una respuesta válida de la IA.');
        }

        console.log('Respuesta de la IA:', response.data.result);
        return response.data.result;
    } catch (error) {
        console.error('⚠️ Error al procesar la solicitud con la IA:', error);
        throw error;
    }
}

// Función para convertir texto a voz (Google Cloud Text-to-Speech)
async function textToSpeech(text) {
    try {
        console.log(`Convirtiendo el texto a voz: ${text}`);
        const response = await axios.post('https://texttospeech.googleapis.com/v1/text:synthesize', {
            input: { text },
            voice: { languageCode: 'es-ES', name: 'es-ES-Standard-A' },
            audioConfig: { audioEncoding: 'MP3' }
        }, {
            headers: {
                'Authorization': `Bearer YOUR_GOOGLE_CLOUD_API_KEY`
            }
        });

        if (!response.data.audioContent) {
            throw new Error('No se recibió audio de la API de TTS.');
        }

        console.log('Respuesta de Google TTS:', response.data);
        const audioContent = response.data.audioContent;
        const audioBuffer = Buffer.from(audioContent, 'base64');
        return audioBuffer;
    } catch (error) {
        console.error('⚠️ Error al convertir texto a voz:', error);
        throw error;
    }
}