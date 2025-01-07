// © Deylin
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtención de la imagen de perfil del usuario
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/jYQH.jpg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  // Mensaje de bienvenida para los nuevos miembros
  if (chat.bienvenida && m.messageStubType == 27) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let bienvenida = chat.sWelcome
      ? chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'Sin descripción')
      : `┏━━━━━━━ 💬 Bienvenida 💬 ━━━━━━━
     │ ✨ **Nuevo miembro: @${m.messageStubParameters[0].split`@`[0]}** ✨
     │ 
     │ 📜 **Grupo:** ${groupMetadata.subject}
     │ 📝 **Descripción:** ${groupMetadata.desc || 'Sin descripción'}
     │
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Enviar mensaje de bienvenida
    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal);
  }

  // Mensaje de despedida para los miembros eliminados
  if (chat.bienvenida && m.messageStubType == 28) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let despedida = chat.sBye
      ? chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'Sin descripción')
      : `┏━━━━━━━ 👋 Despedida 👋 ━━━━━━━
     │ 👤 **Adiós @${m.messageStubParameters[0].split`@`[0]}** 👤
     │ 
     │ 💔 **Lamentamos tu partida...**
     │ 😔 **Esperamos que algún día regreses.**
     │
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Enviar mensaje de despedida
    await conn.sendAi(m.chat, botname, textbot, despedida, img, img, canal);
  }

  // Mensaje para los usuarios eliminados por la expulsión
  if (chat.bienvenida && m.messageStubType == 32) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let expulsado = chat.sBye
      ? chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'Sin descripción')
      : `┏━━━━━━━ 🚫 Expulsión 🚫 ━━━━━━━
     │ ⚠️ **@${m.messageStubParameters[0].split`@`[0]} ha sido expulsado** ⚠️
     │ 
     │ ❌ **Razón:** Comportamiento inapropiado.
     │ 🕊️ **Esperamos que puedas mejorar y volver.**
     │
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Enviar mensaje de expulsión
    await conn.sendAi(m.chat, botname, textbot, expulsado, img, img, canal);
  }
}