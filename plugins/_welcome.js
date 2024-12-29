import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/t9l5f4.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let welcome = chat.sWelcome.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal)
    } else {
      let bienvenida = `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║「 Bienvenido 」\n╚╦★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   ║✑  Bienvenido a\n   ║✑  ${groupMetadata.subject}\n   *╚═══❖⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕❖═══╝*
╔═════ೋೋ═════╗
║𝑼𝒏𝒆𝒕𝒆 𝒂𝒎𝒊 𝒄𝒂𝒏𝒂𝒍 𝒐𝒇𝒊𝒄𝒊𝒂𝒍     ║
╚═════ೋೋ═════╝
https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m
`
      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal)
    }
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    } else {
      let bye = `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║「 ADIOS 👋 」\n╚╦★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   ║✑  Se fue\n   ║✑ Jamás te quisimos aquí\n   *╚═══❖•⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕•❖═══╝*`
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    }
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    } else {
      let kick = `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║〘 ADIOS 👋 〙\n╚╦✎ 〘 @${m.messageStubParameters[0].split`@`[0]} 〙\n   ║✎  Se fue\n   ║✇ Jamás te quisimos aquí\n   *╚═══❖•⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕•❖═══╝*`
      await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal)
    }
}}