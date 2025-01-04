import textToSpeech from '@google-cloud/text-to-speech';
import {writeFileSync, unlinkSync} from 'fs';
import {join} from 'path';

const defaultLang = 'es';
const client = new textToSpeech.TextToSpeechClient();

const handler = async (m, {conn, args, usedPrefix, command}) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted?.text) text = m.quoted.text;
  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    m.reply(e + '');
    text = args.join(' ');
    if (!text) throw `*🌟 Te Faltó Un Texto*\n\nEjemplo:\n- !tts Hola Tecno`;
    res = await tts(text, defaultLang);
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  }
};
handler.help = ['tts <lang> <teks>'];
handler.tags = ['transformador'];
handler.group = true;
handler.register = true;
handler.command = ['tts'];
export default handler;

async function tts(text, lang = 'es') {
  console.log(lang, text);
  try {
    const request = {
      input: {text},
      voice: {
        languageCode: lang,
        ssmlGender: 'MALE', // Cambia a 'FEMALE' para voz femenina.
      },
      audioConfig: {
        audioEncoding: 'LINEAR16', // Cambia a otros formatos si es necesario.
      },
    };
    const [response] = await client.synthesizeSpeech(request);
    const filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date()) + '.wav');
    writeFileSync(filePath, response.audioContent, 'binary');
    return readFileSync(filePath);
  } catch (e) {
    throw e;
  }
}