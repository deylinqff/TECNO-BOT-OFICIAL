import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/jYQH.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let welcome = chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal)
    } else {
      let bienvenida = `        𝑻𝒆𝒄𝒏𝒐-𝑷𝒍𝒖𝒔-𝑩𝒐𝒕
        「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 」
        「 @${user} 」
        「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠/𝔸 」
        「 ${groupMetadata.subject} 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓`
      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img)
    }
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let bye = `        𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔
        「 𝔸𝕕𝕚𝕠𝕤 」
        「 @${user} 」
        「 𝕊𝕖 𝔽𝕦𝕖 」
        「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓`
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    }
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let kick = `        𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔
        「 𝔸𝕕𝕚𝕠𝕤 」
        「 @${user} 」
        「 𝕊𝕖 𝔽𝕦𝕖 」
        「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓`
      await conn.sendAi(m.chat, botname, textbot, kick, img, img)
    }
}}