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
       //     await conn.reply(m.chat, "     ͞ ͟͞ ͟𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭 ͟͞ ͞   \n╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝\n\n𝑺𝒐𝒚 𝗧𝗲𝗰𝗻𝗼-𝘽𝙤𝙩 𝒆𝒍 𝒎𝒆𝒋𝒐𝒓 𝒃𝒐𝒕 𝒅𝒆 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑!!\n𝑬𝒔𝒕𝒆 𝒈𝒓𝒖𝒑𝒐 𝒏𝒐 𝒕𝒆 𝒏𝒆𝒔𝒆𝒄𝒊𝒕𝒂, 𝒂𝒅𝒊𝒐𝒔𝒊𝒕𝒐 𝒃𝒐𝒕 𝒅𝒆 𝒔𝒆𝒈𝒖𝒏𝒅𝒂.", null, rcanal);

            if (isBotAdmin) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
    }
}