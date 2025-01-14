import { pinterest } from '@bochilteam/scraper';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ ${mssg.example}: ${usedPrefix + command} Lil Peep`;

  try {
    const json = await pinterest(text);
    const imageUrl = json.getRandom();

    // Verificar si la URL es válida y obtener el contenido de la imagen
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Verificar el tamaño de la imagen para garantizar la calidad
    if (response.status === 200) {
      const buffer = Buffer.from(response.data, 'binary');
      conn.sendFile(m.chat, buffer, 'pinterest.jpg', `
*❖  Pinterest:*  ${text}
`.trim(), m);
    } else {
      throw 'No se pudo obtener una imagen de buena calidad. Intenta de nuevo.';
    }
  } catch (e) {
    throw `❌ Error: ${e.message || e}`;
  }
};

handler.help = ['pinterest'];
handler.tags = ['img'];
handler.command = ['pinterest'];

export default handler;