import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.ibb.co/JndpnfX/LynxAI.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `
╔════════════════════════════╗
║ 🚀 *${botname} - INTEGRACIÓN COMPLETA* 🚀
╠════════════════════════════╣
║ 🎉 *Bienvenido al sistema*               
║ Usuario: @${m.messageStubParameters[0].split`@`[0]}   
║ 📡 Grupo: ${groupMetadata.subject}    
║ 🛠️ Usa *#menu* para explorar comandos. 
╚════════════════════════════╝`;
    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo);
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `
╔════════════════════════════╗
║ ⚠️ *${botname} - USUARIO DESCONECTADO* ⚠️
╠════════════════════════════╣
║ ❌ *Salida detectada*
║ Usuario: @${m.messageStubParameters[0].split`@`[0]}    
║ ⚡ Gracias por participar.   
║ 📌 Acceso revocado del nodo.  
╚════════════════════════════╝`;
    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo);
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `
╔════════════════════════════╗
║ ❌ *${botname} - USUARIO EXPULSADO* ❌
╠════════════════════════════╣
║ ⚠️ *Acción ejecutada*               
║ Usuario: @${m.messageStubParameters[0].split`@`[0]}   
║ 🛑 Acceso denegado por administración.  
║ 🛠️ Contacta soporte si crees que fue un error. 
╚════════════════════════════╝`;
    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo);
  }
