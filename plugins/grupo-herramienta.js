let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return;

    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    let chat = global.db.data.chats[m.chat];
    let usuario = `@${m.sender.split`@`[0]}`;
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg';

    let nombre, foto, edit, newlink, status, admingp, noadmingp;

    nombre = `💠 *SISTEMA DETECTADO* 💠\n\n📡 *Usuario:* ${usuario}\n🛠️ *Modificó el nombre del grupo*\n\n🔹 *Nuevo nombre:* *${m.messageStubParameters[0]}*`;
    foto = `⚡ *SISTEMA DETECTADO* ⚡\n\n📡 *Usuario:* ${usuario}\n🌌 *Cambió la imagen del grupo*\n\n🌀 *Grupo:* *${groupMetadata.subject}*`;
    edit = `💾 *CONFIGURACIÓN ACTUALIZADA* 💾\n\n📡 *Usuario:* ${usuario}\n🔐 *Ahora ${m.messageStubParameters[0] == 'on' ? 'solo los administradores' : 'todos los miembros'} pueden configurar el grupo*`;
    newlink = `🔗 *ENLACE RESTAURADO* 🔗\n\n📡 *Acción realizada por:* *${usuario}*`;
    status = `💬 *ESTADO DEL GRUPO* 💬\n\n📡 *Usuario:* ${usuario}\n🛡️ *El grupo ahora está ${m.messageStubParameters[0] == 'on' ? '🔒 *CERRADO*' : '🔓 *ABIERTO*'}*\n\n🔹 *Ahora ${m.messageStubParameters[0] == 'on' ? 'solo los administradores' : 'todos los miembros'} pueden enviar mensajes.*`;
    admingp = `👑 *NUEVO ADMINISTRADOR* 👑\n\n📡 *Usuario añadido:* *@${m.messageStubParameters[0].split`@`[0]}*\n🛠️ *Acción realizada por:* *${usuario}*`;
    noadmingp = `🛠️ *ADMINISTRADOR RETIRADO* 🛠️\n\n📡 *Usuario retirado:* *@${m.messageStubParameters[0].split`@`[0]}*\n🔹 *Acción realizada por:* *${usuario}*`;

    if (chat.detect && m.messageStubType == 21) {
        await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 22) {
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 23) {
        await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 25) {
        await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 26) {
        await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 29) {
        await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak });
        return;
    } if (chat.detect && m.messageStubType == 30) {
        await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak });
    }
}