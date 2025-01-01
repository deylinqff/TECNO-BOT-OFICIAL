const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users;

    // Verifica si hay un mensaje citado
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        // Asegura que la mención se procese correctamente
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        // Si no hay mención o cita, devuelve un mensaje de ayuda
        await conn.reply(m.chat, `👤 Etiqueta o responde al mensaje del usuario que quieras Desbanear, Ejemplo:\n> → *${usedPrefix}unbanuser <@tag>*`, m);
        return;
    }

    // Verifica si el usuario está en la base de datos
    if (db[user]) {
        // Desbanea al usuario
        db[user].banned = false;
        db[user].banRazon = '';

        // Obtiene el nombre del usuario
        const nametag = await conn.getName(user);
        const nn = await conn.getName(m.sender);  // Obtiene el nombre del que ejecutó el comando

        // Responde en el chat donde se ejecutó el comando
        await conn.reply(m.chat, `✅️ El usuario *${nametag}* ha sido desbaneado.`, m, { mentionedJid: [user] });

        // Notifica en otro chat (si es necesario) sobre el desbaneo
        conn.reply('584120346669@s.whatsapp.net', `👤 El usuario *${nametag}* ha sido desbaneado por *${nn}*`, m);
    } else {
        // Si el usuario no está en la base de datos
        await conn.reply(m.chat, `👤 El usuario no está registrado o no está baneado.`, m);
    }
};

handler.help = ['unbanuser <@tag>'];
handler.command = ['unbanuser'];
handler.tags = ['mods'];
handler.mods = true;
handler.group = false;
export default handler;