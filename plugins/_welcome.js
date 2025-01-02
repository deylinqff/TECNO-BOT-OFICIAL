export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { key: { fromMe: false, participant: '0@s.whatsapp.net' }, message: { conversation: '¡Hola!' } };

    if (!m.messageStubType || !m.isGroup) return true;

    let userId = m.messageStubParameters[0];

    const welcomeImage = 'https://files.catbox.moe/ibij1z.jpg'; // Imagen de bienvenida
    const goodbyeImage = 'https://files.catbox.moe/r44rha.jpg'; // Imagen de despedida

    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(welcomeImage)).buffer();
    }

    let chat = global.db.data.chats[m.chat];

    if (chat.welcome && m.messageStubType === 27) { // Mensaje de bienvenida
        let wel = `┌─⪩ *TECNO-BOT 🤖* \n│「 ¡𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎! 」\n└┬⪩ Usuario: @${userId.split`@`[0]}\n   │✨  Nos alegra tenerte en\n   │📢  ${groupMetadata.subject}\n   │🔗 Usa *#menu* para ver comandos\n   └───────────────`;
        try {
            await conn.sendMini(m.chat, "TECNO-BOT", "By TECNO TEAM", wel, img, img, null, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    if (chat.welcome && m.messageStubType === 28) { // Mensaje de despedida
        let bye = `┌─⪩ *TECNO-BOT 🤖* \n│「 𝐇𝐀𝐒𝐓𝐀 𝐋𝐔𝐄𝐆𝐎 」\n└┬⪩ Usuario: @${userId.split`@`[0]}\n   │🛑  Ha dejado el grupo\n   │💔  ¡Te deseamos lo mejor!\n   └───────────────`;
        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMini(m.chat, "TECNO-BOT", "By TECNO TEAM", bye, img2, img2, null, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }

    if (chat.welcome && m.messageStubType === 32) { // Mensaje de expulsión
        let kick = `┌─⪩ *TECNO-BOT 🤖* \n│「 𝐄𝐗𝐏𝐔𝐋𝐒𝐀𝐃𝐎 」\n└┬⪩ Usuario: @${userId.split`@`[0]}\n   │❌  Ha sido removido del grupo\n   │🚪  ¡Que tengas suerte!\n   └───────────────`;
        let img3;
        try {
            img3 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMini(m.chat, "TECNO-BOT", "By TECNO TEAM", kick, img3, img3, null, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de expulsión:', sendError);
        }
    }
}