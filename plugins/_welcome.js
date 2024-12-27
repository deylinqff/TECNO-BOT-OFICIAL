import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '💻 Bienvenido/a al Futuro 💡' } 
    };

    if (!m.messageStubType || !m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    const userId = m.messageStubParameters[0];
    const welcomeImage = 'https://files.catbox.moe/j2chet.jpg';
    const goodbyeImage = 'https://files.catbox.moe/e5ua3q.jpg';

    const futuristicIcon = "🛰️";
    const futuristicBorder = "⎯⎯⎯⎯⎯⎯⎯⎯⎯";

    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    const fetchImage = async (url) => {
        try {
            return await (await fetch(url)).buffer();
        } catch {
            return null;
        }
    };

    let img = await fetchImage(pp || welcomeImage);

    // Bienvenida
    if (chat.welcome && m.messageStubType === 27) {
        const welcomeMsg = `
${futuristicIcon} *BIENVENIDO/A AL GRUPO TECNOLÓGICO* ${futuristicIcon}

${futuristicBorder}
🌌 Usuario: *@${userId.split`@`[0]}*
🤖 Grupo: *${groupMetadata.subject}*

🔧 Usa *#menu* para explorar comandos y herramientas.
⎯⎯⎯⎯⎯⎯⎯⎯⎯`;

        try {
            await conn.sendMessage(m.chat, { 
                image: img, 
                caption: welcomeMsg, 
                mentions: [userId + '@s.whatsapp.net'] 
            });
        } catch (error) {
            console.error('Error enviando mensaje de bienvenida:', error);
        }
    }

    // Despedida
    if (chat.welcome && m.messageStubType === 28) {
        const goodbyeMsg = `
${futuristicIcon} *ADIOS, ASTRONAUTA DIGITAL* ${futuristicIcon}

${futuristicBorder}
🌠 Usuario: *@${userId.split`@`[0]}*
📂 Razón: Ha salido del grupo.

🌟 ¡Te deseamos éxitos en tu viaje!`;
        img = await fetchImage(goodbyeImage);

        try {
            await conn.sendMessage(m.chat, { 
                image: img, 
                caption: goodbyeMsg, 
                mentions: [userId + '@s.whatsapp.net'] 
            });
        } catch (error) {
            console.error('Error enviando mensaje de despedida:', error);
        }
    }

    // Expulsión
    if (chat.welcome && m.messageStubType === 32) {
        const kickMsg = `
${futuristicIcon} *USUARIO EXPULSADO* ${futuristicIcon}

${futuristicBorder}
❌ Usuario: *@${userId.split`@`[0]}*
📂 Razón: Expulsión forzada.

💾 *Consejo:* Respetar las normas asegura tu permanencia.`;
        img = await fetchImage(goodbyeImage);

        try {
            await conn.sendMessage(m.chat, { 
                image: img, 
                caption: kickMsg, 
                mentions: [userId + '@s.whatsapp.net'] 
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