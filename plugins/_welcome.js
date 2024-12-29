import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let chat = global.db.data.chats[m.chat];

  // Diferentes imágenes para distintas acciones
  const welcomeImg = 'https://files.catbox.moe/welcome_image.jpg';
  const byeImg = 'https://files.catbox.moe/bye_image.jpg';
  const kickImg = 'https://files.catbox.moe/kick_image.jpg';

  if (chat.bienvenida && m.messageStubType == 27) { // Bienvenida
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let welcomeMessage = chat.sWelcome 
      ? chat.sWelcome.replace('@user', user) 
      : `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║「 Bienvenido 」\n╚╦★ 「 ${user} 」\n   ║✑  Bienvenido a\n   ║✑  ${groupMetadata.subject}\n   *╚═══❖⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕❖═══╝*`;

    await conn.sendAi(m.chat, botname, textbot, welcomeMessage, welcomeImg, welcomeImg, canal);
  }

  if (chat.bienvenida && m.messageStubType == 28) { // Alguien se va
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let byeMessage = chat.sBye 
      ? chat.sBye.replace('@user', user) 
      : `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║「 ADIOS 👋 」\n╚╦★ 「 ${user} 」\n   ║✑  Se fue\n   ║✑ Jamás te quisimos aquí\n   *╚═══❖•⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕•❖═══╝*`;

    await conn.sendAi(m.chat, botname, textbot, byeMessage, byeImg, byeImg, canal);
  }

  if (chat.bienvenida && m.messageStubType == 32) { // Expulsión
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let kickMessage = chat.sBye 
      ? chat.sBye.replace('@user', user) 
      : `╔══⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕 \n║〘 ADIOS 👋 〙\n╚╦✎ 〘 ${user} 〙\n   ║✎  Se fue\n   ║✇ Jamás te quisimos aquí\n   *╚═══❖•⏤͟͟͞͞𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕•❖═══╝*`;

    await conn.sendAi(m.chat, botname, textbot, kickMessage, kickImg, kickImg, canal);
  }
}