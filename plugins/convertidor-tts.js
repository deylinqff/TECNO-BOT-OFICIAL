import textToSpeech from '@google-cloud/text-to-speech';
import {writeFileSync, unlinkSync, readFileSync} from 'fs';
import {join} from 'path';

const defaultLang = 'es'; // Idioma predeterminado
const client = new textToSpeech.TextToSpeechClient(); // Cliente de Google TTS

const handler = async (m, {conn, args}) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted?.text) text = m.quoted.text;

  let res;
  try {
    res = await tts(text, lang); // Llama a la función TTS
  } catch (e) {
    m.reply(e + '');
    text = args.join(' ');
    if (!text) throw `*🌟 Te Faltó Un Texto*\n\nEjemplo:\n- !tts Hola Tecno`;
    res = await tts(text, defaultLang);
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.mp3', null, m, true); // Envía el archivo de audio
  }
};

handler.help = ['tts <lang> <texto>'];
handler.tags = ['transformador'];
handler.group = true;
handler.register = true;
handler.command = ['tts'];
export default handler;

// Función para generar TTS con voz masculina
async function tts(text, lang = 'es') {
  console.log(`Idioma: ${lang}, Texto: ${text}`);
  try {
    const request = {
      input: {text},
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