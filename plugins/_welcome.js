import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let img = imagen1
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let welcome = ` 𝑻𝒆𝒄𝒏𝒐-𝑷𝒍𝒖𝒔-𝑩𝒐𝒕 \n「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠/𝔸 」\n「 ${groupMetadata.subject} 」\n\n> 𝕯𝖊𝖞𝖑𝖎𝖓`
await conn.sendLuffy(m.chat, packname, textbot, welcome, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = ` 𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔 \n「 𝔸𝕕𝕚𝕠𝕤 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 𝕊𝕖 𝔽𝕦𝕖 」\n「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」\n\n> 𝕯𝖊𝖞𝖑𝖎𝖓`
await conn.sendLuffy(m.chat, packname, textbot, bye, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = ` 𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔 \n「 Aԃισʂ 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 𝕊𝕖 𝔽𝕦𝕖 」\n「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」\n\n> 𝕯𝖊𝖞𝖑𝖎𝖓`
await conn.sendLuffy(m.chat, packname, textbot, kick, img, img, redes, fkontak)
}}