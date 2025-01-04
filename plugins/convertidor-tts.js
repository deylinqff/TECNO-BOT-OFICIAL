import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import { join } from 'path';

const client = new textToSpeech.TextToSpeechClient();
const defaultLang = 'es';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted?.text) text = m.quoted.text;

  let res;
  try {
    res = await synthesizeSpeech(text, lang);
  } catch (e) {
    m.reply(e.message);
    if (!text) throw `*🌟 Te Faltó Un Texto*\n\nEjemplo:\n- !tts Hola Tecno`;
    res = await synthesizeSpeech(text, defaultLang);
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.mp3', null, m, true);
  }
};

handler.help = ['tts <lang> <teks>'];
handler.tags = ['transformador'];
handler.group = true;
handler.register = true;
handler.command = ['tts'];
export default handler;

async function synthesizeSpeech(text, lang = 'es') {
  const request = {
    input: { text },
    voice: { languageCode: lang, ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const filePath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}.mp3`);
  await util.promisify(fs.writeFile)(filePath, response.audioContent, 'binary');
  const audioBuffer = fs.readFileSync(filePath);
  fs.unlinkSync(filePath);
  return audioBuffer;
}