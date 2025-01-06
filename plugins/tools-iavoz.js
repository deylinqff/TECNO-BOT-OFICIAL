/* Código creado por Deylin */

import axios from 'axios';
import textToSpeech from '@google-cloud/text-to-speech';
import { writeFileSync, unlinkSync, readFileSync } from 'fs';
import { join } from 'path';

const defaultLang = 'es'; // Idioma predeterminado
const client = new textToSpeech.TextToSpeechClient(); // Cliente de Google TTS

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const username = `${conn.getName(m.sender)}`;
    const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo el anime. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

    // Palabras clave y categorías
    const sexualKeywords = ["sexo", "sexual", "pornografía", "erótico", "erotismo", "sensual", "relación íntima", "porno", "pene", "vrg", "gay", "gey"];
    const gamesKeywords = ["juego", "videojuego", "gaming", "consola", "pc", "playstation", "xbox", "nintendo", "gamer"];
    const adventureKeywords = ["aventura", "explorar", "exploración", "viajar", "mundo", "misión", "acción"];

    if (!text) {
        return conn.reply(m.chat, `⚠️ *Falta texto para procesar tu solicitud.*\n\n📝 Ejemplo de uso: \n${usedPrefix + command} ¿Cómo se hace un avión de papel?`, m);
    }

    // Mostrar que está "pensando"
    await m.react('💭');

    try {
        const query = text;
        const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
        const response = await luminsesi(query, username, prompt);

        // Convertir la respuesta a audio
        const audioContent = await tts(response, defaultLang);

        // Enviar mensaje con solo audio
        await conn.sendMessage(m.chat, {
            audio: audioContent,
            mimetype: 'audio/mp3',
            caption: 'Aquí tienes la respuesta en audio'
        }, { quoted: m });
    } catch (error) {
        console.error('⚠️ Error al obtener la respuesta:', error);
        await conn.reply(m.chat, '⚠️ Lo siento, no pude procesar tu solicitud. Por favor, inténtalo más tarde.', m);
    }
};

handler.help = ['chatgpt <texto>', 'ia <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['ia', 'chatgpt', 'ai', 'chat', 'gpt'];

export default handler;

// Función para interactuar con la IA usando prompts
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

// Función para generar TTS con voz masculina
async function tts(text, lang = 'es') {
    console.log(`Idioma: ${lang}, Texto: ${text}`);
    try {
        const request = {
            input: { text },
            voice: {
                languageCode: lang,
                name: 'es-ES-Wavenet-B', // Voz masculina específica
                ssmlGender: 'MALE', // Género masculino
            },
            audioConfig: {
                audioEncoding: 'MP3', // Formato de audio
            },
        };

        // Genera el audio con Google TTS
        const [response] = await client.synthesizeSpeech(request);

        // Guarda el archivo temporalmente
        const filePath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}.mp3`);
        writeFileSync(filePath, response.audioContent, 'binary');

        // Lee y retorna el contenido del archivo
        const audioContent = readFileSync(filePath);
        unlinkSync(filePath); // Elimina el archivo temporal
        return audioContent;
    } catch (e) {
        throw new Error(`Error al generar TTS: ${e.message}`);
    }
}