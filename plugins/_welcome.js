import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '¡Hola!' } 
    };

    if (!m.messageStubType || !m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.welcome) return;

    const userId = m.messageStubParameters[0];
    const groupName = groupMetadata.subject;
    const userMention = `@${userId.split`@`[0]}`;

    const assets = {
        welcomeImage: 'https://files.catbox.moe/ibij1z.jpg',
        goodbyeImage: 'https://files.catbox.moe/r44rha.jpg',
        welcomeAudio: 'https://files.catbox.moe/wo866r.m4a',
        goodbyeAudio: 'https://files.catbox.moe/hmuevx.opus',
    };

    let userProfilePic;
    try {
        userProfilePic = await conn.profilePictureUrl(userId, 'image');
    } catch {
        userProfilePic = assets.welcomeImage;
    }

    async function fetchBuffer(url) {
        try {
            return await (await fetch(url)).buffer();
        } catch {
            return await (await fetch(assets.welcomeImage)).buffer();
        }
    }

    async function sendNotification(type, message, image, audio) {
        try {
            const imgBuffer = await fetchBuffer(image);
            await conn.sendMessage(m.chat, { 
                text: message,
                mentions: [userId],
                contextInfo: { 
                    externalAdReply: {
                        title: type === "welcome" ? "🚀 INTEGRACIÓN EXITOSA" : "⚠️ DESVINCULACIÓN DETECTADA",
                        body: groupName,
                        thumbnail: imgBuffer,
                        mediaUrl: "https://example.com",
                        showAdAttribution: true,
                    }
                } 
            });

            if (audio) {
                await conn.sendMessage(m.chat, { 
                    audio: { url: audio }, 
                    mimetype: 'audio/mpeg', 
                    ptt: true, 
                    mentions: [userId]
                });
            }
        } catch (error) {
            console.error(`Error al enviar mensaje de ${type}:`, error);
        }
    }

    // Mensajes personalizados
    const messages = {
        welcome: `
        ╔══════════════════════════╗
        ║    🌐 *BIENVENIDO AL NODO* 🌐    ║
        ╠══════════════════════════╣
        ║ Usuario: ${userMention}               ║
        ║ Grupo: ${groupName}                    ║
        ║ 📌 Usa *#menu* para ver opciones. 📌   ║
        ╚══════════════════════════╝`,
        
        goodbye: `
        ╔══════════════════════════╗
        ║   💾 *USUARIO DESCONECTADO* 💾   ║
        ╠══════════════════════════╣
        ║ Usuario: ${userMention}               ║
        ║ ⚡ Gracias por participar. ⚡          ║
        ╚══════════════════════════╝`,
        
        removed: `
        ╔══════════════════════════╗
        ║   ❌ *USUARIO ELIMINADO* ❌    ║
        ╠══════════════════════════╣
        ║ Usuario: ${userMention}               ║
        ║ 🛑 Acceso revocado por administración. ║
        ╚══════════════════════════╝`,
    };

    // Eventos
    if (m.messageStubType === 27) { // Bienvenida
        await sendNotification("welcome", messages.welcome, assets.welcomeImage, assets.welcomeAudio);
    }

    if (m.messageStubType === 28) { // Despedida
        await sendNotification("goodbye", messages.goodbye, assets.goodbyeImage, assets.goodbyeAudio);
    }

    if (m.messageStubType === 32) { // Expulsión
        await sendNotification("removed", messages.removed, assets.goodbyeImage, assets.goodbyeAudio);
    }
}