import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    await m.react('♛');

    let username = conn.getName(m.sender);

    // VCARD del creador
    let creatorContact = {
        displayName: "𝑫𝒆𝒚𝒍𝒊𝒏 ☆",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𝑫𝒆𝒚𝒍𝒊𝒏 🚀\nitem1.TEL;waid=50488198573:50488198573\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:deylibaquedano801@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://github.com/Deylinel/TECNO-BOT-OFICIAL:;; Honduras 🇭🇳 ;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    };

    // VCARD del bot
    let botContact = {
        displayName: "Bot Oficial 🤖",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${await conn.getName(conn.user.jid)}\nitem1.TEL;waid=${conn.user.jid.split('@')[0]}:${conn.user.jid.split('@')[0]}\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:bot@example.com\nitem2.X-ABLabel:Email\nitem3.URL:https://github.com/The-King-Destroy/Yuki_Suou-Bot\nitem3.X-ABLabel:Internet\nitem4.ADR:;; 🌌 Internet;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    };

    // Lista de contactos (el creador primero, el bot después)
    let contactList = [creatorContact, botContact];

    // Enviar contactos
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${contactList.length} Contactos`,
            contacts: contactList
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'һ᥆ᥣᥲ, soy ᥕіᥣᥣzᥱk-᥆𝖿ᥴ ᥱᥣ mᥱȷ᥆r',
                body: 'Creador oficial',
                thumbnailUrl: 'https://files.catbox.moe/185de7.jpg',
                sourceUrl: 'https://youtube.com/@kakaroto-bot',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    // Mensaje adicional
    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador y del bot*`;

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '© ᥴrᥱᥲძ᥆r ᥕіᥣᥣzᥱk & Bot Oficial',
        viewOnce: true,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;