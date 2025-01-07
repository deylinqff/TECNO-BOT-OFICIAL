conn.ev.on('group-participants.update', async (update) => {
  console.log('Evento de participantes detectado:', update);

  if (update.action === 'add' && update.participants.includes(conn.user.jid)) {
    const reglasYPoliticas = `┌───「 *Normas y Políticas del Bot* 」───┐
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
*Bot administrado por Barboza Bot 🤖*
© Código creado por Deyin`;

    try {
      await conn.sendMessage(update.id, { text: reglasYPoliticas });
      console.log('Mensaje de normas enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }
});