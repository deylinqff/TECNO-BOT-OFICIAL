let linkRegex = /(?:https?:\/\/)?chat\.whatsapp\.com\/([0-9A-Za-z-]+)/i;

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat] || {};
    let delet = m.key.participant || m.participant || m.sender;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = m.text && linkRegex.test(m.text);
    const grupo = `https://chat.whatsapp.com`;

    // Comandos para activar/desactivar antilink2
    if (m.text === '.enable antilink2' && isAdmin) {
        chat.antiLink2 = true;
        return conn.reply(m.chat, `✅ *El sistema de Anti-Link2 ha sido activado.*`, m);
    }
    if (m.text === '.disable antilink2' && isAdmin) {
        chat.antiLink2 = false;
        return conn.reply(m.chat, `❌ *El sistema de Anti-Link2 ha sido desactivado.*`, m);
    }

    if (!chat.antiLink2) return !0; // Si AntiLink2 está desactivado, no hace nada.

    if (isAdmin && chat.antiLink2 && m.text.includes(grupo)) {
        return conn.reply(m.chat, `🏷 *Hey!! el Anti-Link2 está activo, pero eres admin. ¡Salvado!*`, m);
    }

    if (chat.antiLink2 && isGroupLink && !isAdmin) {
        // Registrar infracciones
        chat.infractions = chat.infractions || {};
        chat.infractions[m.sender] = (chat.infractions[m.sender] || 0) + 1;

        if (chat.infractions[m.sender] === 1) {
            // Primera infracción: Eliminar mensaje
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                return conn.reply(m.chat, `📎 *¡Enlace detectado!*\n\nEste es tu primer aviso, la próxima vez serás eliminado.`, m);
            } else {
                return conn.reply(m.chat, `🌼 *No soy admin, no puedo eliminar mensajes ni usuarios.*`, m);
            }
        } else if (chat.infractions[m.sender] >= 2) {
            // Segunda infracción: Eliminar al usuario
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                delete chat.infractions[m.sender]; // Reiniciar infracciones tras eliminar
                return conn.reply(m.chat, `📎 *¡Enlace detectado nuevamente!*\n\nHas sido eliminado por reincidir.`, m);
            } else {
                return conn.reply(m.chat, `🌼 *No soy admin, no puedo eliminar usuarios.*`, m);
            }
        }
    }

    return !0;
}