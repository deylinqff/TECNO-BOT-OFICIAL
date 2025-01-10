import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (!m.isGroup) return true;

  // Verifica si el mensaje es un comando
  const command = m.text.toLowerCase().trim();

  // Respuesta al comando `info` o `normas`
  if (command === '!info' || command === '!normas') {
    const mensajeCompleto = `
┌「 *NORMAS Y POLÍTICAS DE TECNO* 」┐
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
└───────────────────────┈ ⳹
*©Bot administrado por Deylin 🤖*`;

    // Foto de perfil del grupo o imagen predeterminada
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://i.ibb.co/fNCMzcR/file.jpg');
    let img = await (await fetch(pp)).buffer();

    // Botones interactivos
    const buttons = [
      { buttonId: 'audio', buttonText: { displayText: '✅ Esta bien' }, type: 1 },
      { buttonId: 'video', buttonText: { displayText: '❎ Esta mal' }, type: 1 },
    ];

    // Enviar mensaje de normas
    await conn.sendMessage(m.chat, {
      text: mensajeCompleto,
      image: img,
      buttons: buttons,
      footer: 'Selecciona una opción:',
    });

    console.log(`Normas enviadas automáticamente en respuesta al comando.`);
  }
}