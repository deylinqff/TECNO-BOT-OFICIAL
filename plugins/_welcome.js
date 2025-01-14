import { WAMessageStubType } from '@whiskeysockets/baileys'; // Asegúrate de instalar este paquete
import fetch from 'node-fetch'; // Asegúrate de que fetch esté configurado

export async function before(m, { conn, participants, groupMetadata }) {
  // Verificar si no es un mensaje de sistema o si no es un grupo
  if (!m.messageStubType || !m.isGroup) return true;

  // Variables globales necesarias
  let img = 'ruta_a_la_imagen'; // Reemplaza con la URL de la imagen deseada
  let chat = global.db?.data?.chats?.[m.chat]; // Validar que chat exista
  let packname = '𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔'; // Nombre del paquete
  let textbot = 'Texto personalizado'; // Texto opcional
  let redes = 'Información de redes sociales'; // Reemplaza con tus redes
  let fkontak = {}; // Contacto (puede ser un objeto con información relevante)

  // Asegurarse de que `chat` tenga configurada la bienvenida
  if (!chat?.welcome) return;

  // Procesar eventos según el tipo de stub
  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_PARTICIPANT_ADD: {
      // Mensaje de bienvenida
      const user = m.messageStubParameters[0].split`@`[0];
      const welcomeMessage = `
        𝑻𝒆𝒄𝒏𝒐-𝑷𝒍𝒖𝒔-𝑩𝒐𝒕
        「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 」
        「 @${user} 」
        「 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠/𝔸 」
        「 ${groupMetadata.subject} 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓
      `;
      await conn.sendLuffy(m.chat, packname, textbot, welcomeMessage, img, img, redes, fkontak);
      break;
    }
    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE: {
      // Mensaje de despedida
      const user = m.messageStubParameters[0].split`@`[0];
      const byeMessage = `
        𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔
        「 𝔸𝕕𝕚𝕠𝕤 」
        「 @${user} 」
        「 𝕊𝕖 𝔽𝕦𝕖 」
        「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓
      `;
      await conn.sendLuffy(m.chat, packname, textbot, byeMessage, img, img, redes, fkontak);
      break;
    }
    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE: {
      // Mensaje de expulsión
      const user = m.messageStubParameters[0].split`@`[0];
      const kickMessage = `
        𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕-𝑷𝒍𝒖𝒔
        「 Aԃισʂ 」
        「 @${user} 」
        「 𝕊𝕖 𝔽𝕦𝕖 」
        「 ℕ𝕦𝕟𝕔𝕒 𝕋𝕖 ℚ𝕦𝕚𝕤𝕚𝕞𝕠𝕤 𝔸𝕢𝕦𝕚 」
        
        > 𝕯𝖊𝖞𝖑𝖎𝖓
      `;
      await conn.sendLuffy(m.chat, packname, textbot, kickMessage, img, img, redes, fkontak);
      break;
    }
    default:
      break;
  }
}