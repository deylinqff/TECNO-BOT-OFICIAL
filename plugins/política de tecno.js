import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const mensajeCompleto = `┌─🚀 *𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕* \n│「 *Bienvenido* 」\n└┬🚀 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🚀 *Bienvenido a*\n   │🚀 *${groupMetadata.subject}*\n   │🚀 *Disfruta de tu estancia.*\n   └───────────────┈ ⳹
  
┌───「 *Normas y Políticas del Bot* 」───┐
├ ✨ *1. Uso Responsable:*
│ - El bot no debe usarse para actividades ilegales, ofensivas o prohibidas.
│ - No se permite saturar el bot con comandos innecesarios.
├ ✨ *2. Respeto:*
│ - Está prohibido insultar o usar lenguaje inapropiado hacia el bot.
│ - Respeta a los administradores y miembros del grupo.
├ ✨ *3. Privacidad:*
│ - El bot no recopila ni comparte información personal.
│ - Los datos del grupo se usan únicamente para responder a comandos.
├ ✨ *4. Soporte:*
│ - Si encuentras un error, informa a los desarrolladores.
│ - El mal uso del bot puede provocar su eliminación del grupo.
├ ✨ *5. Términos Generales:*
│ - Al usar el bot, aceptas estas condiciones.
│ - El incumplimiento puede llevar al bloqueo del servicio.
└────────────────────────────────────┈ ⳹
*Bot administrado por Deylin 🤖*
© Código creado por Deyin`;

  // Foto de perfil del grupo o imagen predeterminada
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://i.ibb.co/fNCMzcR/file.jpg');
  let img = await (await fetch(pp)).buffer();

  // Evento de nuevo participante
  if (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    // Enviar mensaje de bienvenida combinado
    await conn.sendMessage(m.chat, { text: mensajeCompleto, mentions: [m.messageStubParameters[0]], image: img });
    console.log(`Mensaje de bienvenida y normas enviado correctamente.`);
  }
}