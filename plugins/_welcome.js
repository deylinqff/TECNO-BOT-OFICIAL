import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '🤖 Bienvenido/a a la tecnología del futuro 🌌' } 
    };

    if (!m.messageStubType || !m.isGroup) return true;

    const userId = m.messageStubParameters[0];
    const chat = global.db.data.chats[m.chat];
    const futuristicIcon = "🚀";
    const futuristicBorder = "⎯⎯⎯⎯⎯⎯⎯⎯⎯";

    // URLs de imágenes por defecto
    const defaultWelcomeImage = 'https://files.catbox.moe/j2chet.jpg';
    const defaultGoodbyeImage = 'https://files.catbox.moe/e5ua3q.jpg';

    // Obtener imagen de perfil del usuario
    let profilePic;
    try {
        profilePic = await conn.profilePictureUrl(userId, 'image');
    } catch {
        profilePic = null;
    }

    const fetchImage = async (url, fallback) => {
        try {
            return await (await fetch(url)).buffer();
        } catch {
            return await (await fetch(fallback)).buffer();
        }
    };

    // Obtener la imagen correspondiente al evento
    const welcomeImage = await fetchImage(profilePic || defaultWelcomeImage, defaultWelcomeImage);
    const goodbyeImage = await fetchImage(defaultGoodbyeImage, defaultGoodbyeImage);

    // Bienvenida
    if (chat.welcome && m.messageStubType === 27) {
        const welcomeMsg = `
${futuristicIcon} *BIENVENIDO/A AL GRUPO TECNOLÓGICO* ${futuristicIcon}

${futuristicBorder}
🌌 *Usuario:* *@${userId.split`@`[0]}*
💻 *Grupo:* *${groupMetadata.subject}*

🔧 Usa *#menu* para explorar todas las herramientas disponibles.
⎯⎯⎯⎯⎯⎯⎯⎯⎯
        `;
        try {
            await conn.sendMessage(m.chat, { 
                image: welcomeImage, 
                caption: welcomeMsg, 
                mentions: [`${userId}@s.whatsapp.net`] 
            });
        } catch (error) {
            console.error('Error enviando mensaje de bienvenida:', error);
        }
    }

    // Despedida
    if (chat.welcome && m.messageStubType === 28) {
        const goodbyeMsg = `
${futuristicIcon} *HASTA PRONTO, EXPLORADOR DIGITAL* ${futuristicIcon}

${futuristicBorder}
🌠 *Usuario:* *@${userId.split`@`[0]}*
📂 *Razón:* Salida voluntaria del grupo.

🌟 *Mensaje:* ¡Te deseamos éxito en tus futuros proyectos tecnológicos!
⎯⎯⎯⎯⎯⎯⎯⎯⎯
        `;
        try {
            await conn.sendMessage(m.chat, { 
                image: goodbyeImage, 
                caption: goodbyeMsg, 
                mentions: [`${userId}@s.whatsapp.net`] 
            });
        } catch (error) {
            console.error('Error enviando mensaje de despedida:', error);
        }
    }

    // Expulsión
    if (chat.welcome && m.messageStubType === 32) {
        const kickMsg = `
${futuristicIcon} *USUARIO EXPULSADO DEL GRUPO* ${futuristicIcon}

${futuristicBorder}
❌ *Usuario:* *@${userId.split`@`[0]}*
📂 *Razón:* Expulsión por incumplimiento de las normas.

🛠️ *Consejo:* Siempre respeta las reglas para evitar este tipo de situaciones.
⎯⎯⎯⎯⎯⎯⎯⎯⎯
        `;
        try {
            await conn.sendMessage(m.chat, { 
                image: goodbyeImage, 
                caption: kickMsg, 
                mentions: [`${userId}@s.whatsapp.net`] 
            });
        } catch (error) {
            console.error('Error enviando mensaje de expulsión:', error);
        }
    }
}

/*let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/wo866r.m4a';
  let vn2 = 'https://files.catbox.moe/hmuevx.opus';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307382381547@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(ಥ ͜ʖಥ) 𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 (◕︿◕✿)`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363322713003916@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(oꆤ︵ꆤo) 𝘼 𝘿 𝙄 𝙊 𝙎 (|||❛︵❛.)`, 
    "body": `${userName}, Soy gay asi que me voy.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}*/