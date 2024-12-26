import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.ibb.co/V3Hsgcy/file.jpg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `╔═══❖•ೋ° °ೋ•❖═══╗
╔═════ ▓▓ ࿇ ▓▓ ═════╗
╔╦══• •✠•❀•✠ • •══╦╗
✦ 𝔹𝕀𝔼ℕ𝕍𝔼ℕ𝕀𝔻𝕆 ✦
╚╩══• •✠•❀•✠ • •══╩╝
✧ Usuario: @${m.messageStubParameters[0].split`@`[0]}  
✧ Grupo: ${groupMetadata.subject}  
✧ Sistema: ¡Conexión establecida!  
╚═════ ▓▓ ࿇ ▓▓ ═════╝
╚═══❖•ೋ° °ೋ•❖═══╝`;

    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo);
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `╔═══❖•ೋ° °ೋ•❖═══╗
╔═════ ▓▓ ࿇ ▓▓ ═════╗
╔╦══• •✠•❀•✠ • •══╦╗
✦ 𝔻𝔼𝕊ℙ𝔼𝔻𝕀𝔻𝔸 ✦
╚╩══• •✠•❀•✠ • •══╩╝
✧ Usuario: @${m.messageStubParameters[0].split`@`[0]}  
✧ Mensaje: Usuario desconectado del sistema.  
╚═════ ▓▓ ࿇ ▓▓ ═════╝
╚═══❖•ೋ° °ೋ•❖═══╝`;

    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo);
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `╔═══❖•ೋ° °ೋ•❖═══╗
╔═════ ▓▓ ࿇ ▓▓ ═════╗
╔╦══• •✠•❀•✠ • •══╦╗
✦ 𝔼𝕏ℙ𝕌𝕃𝕊𝔸𝔻𝕆 ✦
╚╩══• •✠•❀•✠ • •══╩╝
✧ Usuario: @${m.messageStubParameters[0].split`@`[0]}  
✧ Mensaje: Usuario eliminado de la base de datos.  
╚═════ ▓▓ ࿇ ▓▓ ═════╝
╚═══❖•ೋ° °ೋ•❖═══╝`;

    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo);
  }
}