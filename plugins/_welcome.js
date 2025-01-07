// © Deylin
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '¡Hola!' } 
    };

    // Verifica si es un mensaje de tipo "stub" (eventos) y si es un grupo
    if (!m.isGroup || !m.messageStubType) return true;

    // Identifica el ID del usuario
    const userId = (m.messageStubParameters && m.messageStubParameters[0]) || '';
    if (!userId) return true;

    // URLs de imágenes
    const welcomeImage = 'https://files.catbox.moe/ef2ot0.jpg'; // Imagen de bienvenida
    const goodbyeImage = 'https://files.catbox.moe/4zvxee.jpg'; // Imagen de despedida

    let chat = global.db.data.chats[m.chat];
    let pp;

    // Intenta obtener la foto de perfil del usuario
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    // Descargar imagen de perfil o usar imagen predeterminada
    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(welcomeImage)).buffer();
    }

    // Mensaje de bienvenida
    if (chat.welcome && m.messageStubType === 'GROUP_PARTICIPANT_ADD') {
        let wel = `┌─⪩ TECNO-BOT 🚀\n│「 BIENVENIDO 」\n└┬⪩ @${userId.split`@`[0]}\n   │🚀  「 BIENVENIDO ✰ A 」 ${groupMetadata.subject}!\n   │⚙️  Disfruta de *TECNO* .\n   └───────────────`;

        try {
            await conn.sendMessage(m.chat, { 
                caption: wel, 
                image: img, 
                mentions: [userId] 
            }, { quoted: fkontak });
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    // Mensaje de despedida
    if (chat.welcome && (m.messageStubType === 'GROUP_PARTICIPANT_REMOVE' || m.messageStubType === 'GROUP_PARTICIPANT_LEAVE')) {
        let bye = `┌─⪩ TECNO-BOT 🚀\n│「 ADIÓS 」\n└┬⪩ @${userId.split`@`[0]}\n   │👋 ¡Hasta nunca!\n   │🥀 no te extrañaremos.\n   └───────────────`;

        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMessage(m.chat, { 
                caption: bye, 
                image: img2, 
                mentions: [userId] 
            }, { quoted: fkontak });
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }
}