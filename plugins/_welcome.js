export async function before(m, { conn, participants, groupMetadata }) {
    // Validamos si es un mensaje relevante y si es en un grupo
    if (!m.messageStubType || !m.isGroup) return true;

    const userId = m.messageStubParameters[0]; // Obtenemos el ID del usuario
    const groupName = groupMetadata.subject; // Nombre del grupo

    // URLs de las imágenes de bienvenida y despedida
    const welcomeImage = 'https://files.catbox.moe/4zvxee.jpg';
    const goodbyeImage = 'https://files.catbox.moe/g95ury.jpg';

    // Plantilla de mensaje
    const fkontak = { key: { fromMe: false, participant: '0@s.whatsapp.net' }, message: { conversation: '¡Hola!' } };

    // Variable para la foto del perfil del usuario
    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null; // Si falla, usamos imagen por defecto
    }

    // Intentamos obtener la imagen
    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        console.error('Error al obtener la imagen:', fetchError);
        img = await (await fetch(welcomeImage)).buffer(); // Imagen de respaldo
    }

    // Configuración del grupo
    let chat = global.db.data.chats[m.chat];
    if (!chat || !chat.welcome) return true; // Si no está habilitada la bienvenida, salimos

    // Mensaje de bienvenida
    if (m.messageStubType === 27) { 
        let wel = `┌─⪩ *TECNO-BOT 🤖* \n│「 ¡𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎! 」\n└┬⪩ Usuario: @${user.split`@`[0]}\n   │✨  Nos alegra tenerte en\n   │📢  ${groupName}\n   │🔗 Usa *#menu* para ver comandos\n   └───────────────`;
        try {
            await conn.sendMessage(m.chat, { image: img, caption: wel }, { quoted: fkontak });
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    // Mensaje de despedida
    if (m.messageStubType === 28) {
        let bye = `┌─⪩ *TECNO-BOT 🤖* \n│「 𝐇𝐀𝐒𝐓𝐀 𝐋𝐔𝐄𝐆𝐎 」\n└┬⪩ Usuario: @${user.split`@`[0]}\n   │🛑  Ha dejado el grupo\n   │💔  ¡Te deseamos lo mejor!\n   └───────────────`;
        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMessage(m.chat, { image: img2, caption: bye }, { quoted: fkontak });
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }

    // Mensaje de expulsión
    if (m.messageStubType === 32) {
        let kick = `┌─⪩ *TECNO-BOT 🤖* \n│「 𝐄𝐗𝐏𝐔𝐋𝐒𝐀𝐃𝐎 」\n└┬⪩ Usuario: @${user.split`@`[0]}\n   │❌  Ha sido removido del grupo\n   │🚪  ¡Que tengas suerte!\n   └───────────────`;
        let img3;
        try {
            img3 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMessage(m.chat, { image: img3, caption: kick }, { quoted: fkontak });
        } catch (sendError) {
            console.error('Error al enviar mensaje de expulsión:', sendError);
        }
    }
}