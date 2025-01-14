import axios from 'axios';
import baileys, { generateWAMessageContent, generateWAMessageFromContent, proto } from "@whiskeysockets/baileys";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, "🍟 *¿Qué quieres buscar en Pinterest?*", m);
  }

  // Enviar mensaje inicial
  await m.react('⏳');
  conn.reply(m.chat, '🚩 *Buscando imágenes en Pinterest...*', m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: "TECNO-BOT",
        body: "Resultados de búsqueda en Pinterest",
        previewType: 0,
        thumbnail: icons, // Asegúrate de definir `icons` en tu configuración global
        sourceUrl: channel // Asegúrate de definir `channel` en tu configuración global
      }
    }
  });

  // Realizar búsqueda en Pinterest
  try {
    let response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D`);
    
    let results = response.data.resource_response.data.results.map(item => item.images.orig.url);
    if (results.length === 0) {
      return conn.reply(m.chat, "⚠️ No se encontraron resultados.", m);
    }

    // Barajar resultados y obtener los primeros 5
    results = results.sort(() => Math.random() - 0.5).slice(0, 5);

    // Crear mensajes interactivos
    let carouselCards = [];
    for (let i = 0; i < results.length; i++) {
      const imageUrl = results[i];
      const imageMessage = await generateWAMessageContent({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

      carouselCards.push({
        body: `Imagen ${i + 1}`,
        footer: "Haz clic para ver en Pinterest",
        header: { imageMessage },
        buttons: [{
          buttonText: { displayText: "Ver en Pinterest 📫" },
          buttonId: `${usedPrefix}${command} ${text}`
        }]
      });
    }

    // Enviar mensaje con carrusel
    const message = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
        body: `🚩 Resultados de búsqueda: ${text}`,
        footer: "🔎 Pinterest",
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: carouselCards
        })
      })
    }), { quoted: m });

    await m.react('✅');
    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "❌ Ocurrió un error al buscar en Pinterest.", m);
  }
};

handler.help = ["pinterest <búsqueda>"];
handler.tags = ["descargas"];
handler.command = /^(pinterest)$/i;
handler.register = true;

export default handler;