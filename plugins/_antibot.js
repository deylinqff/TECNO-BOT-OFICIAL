// Comando para habilitar antiBot
export async function enableAntiBot(m, { conn, isAdmin }) {
    if (!isAdmin) {
        return conn.reply(m.chat, "¡Solo los administradores pueden activar esta opción! ⚠️", m);
    }
    
    let chat = global.db.data.chats[m.chat];

    // Habilitar la opción antiBot
    chat.antiBot = true;

    await conn.reply(m.chat, "¡Protección anti-bot activada! 🚫🤖", m);
}

// Comando para deshabilitar antiBot
export async function disableAntiBot(m, { conn, isAdmin }) {
    if (!isAdmin) {
        return conn.reply(m.chat, "¡Solo los administradores pueden desactivar esta opción! ⚠️", m);
    }
    
    let chat = global.db.data.chats[m.chat];

    // Deshabilitar la opción antiBot
    chat.antiBot = false;

    await conn.reply(m.chat, "¡Protección anti-bot desactivada! ✅", m);
}

// Función que antes revisa si se activa el antiBot
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;
    let chat = global.db.data.chats[m.chat]
    let delet = m.key.participant
    let bang = m.key.id
    let bot = global.db.data.settings[this.user.jid] || {}

    if (m.fromMe) return true;

    if (m.id.startsWith('3EB0') && m.id.length === 22) {
        let chat = global.db.data.chats[m.chat];

        if (chat.antiBot) {
            // Mensaje que se enviaría si el bot detecta un mensaje sospechoso de un bot
            await conn.reply(m.chat, "¡Un bot ha sido detectado en el grupo! El bot será eliminado si es necesario.", m);

            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
}