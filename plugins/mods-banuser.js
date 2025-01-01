let handler = async (m, { conn, text, participants }) => {
    if (!text) return m.reply('⚠️ *Ingresa el @tag de algún usuario.*');
    
    let who;
    if (m.isGroup) {
        who = m.mentionedJid && m.mentionedJid[0];
    } else {
        who = m.chat;
    }
    
    if (!who) return m.reply('⚠️ *Ingresa el @tag de algún usuario válido.*');
    
    let users = global.db.data.users;
    if (!users[who]) return m.reply('⚠️ *El usuario no está registrado en la base de datos.*');
    
    users[who].banned = true;
    conn.reply(m.chat, `✅ *El usuario @${who.split('@')[0]} fue baneado con éxito.*`, null, { mentions: [who] });
};

handler.help = ['banuser <@tag>'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;