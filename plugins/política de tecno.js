conn.ev.on('group-participants.update', async (update) => {
  console.log('Evento de participantes detectado:', update);

  let handler = (m, { conn, usedPrefix, command }) => {
    try {
      if (update.action === 'add' && update.participants.includes(conn.user.jid)) {
        global.reglasYPoliticas = `┌───「 *Normas y Políticas del Bot* 」───┐
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

        // Enviar las normas y políticas del bot al grupo
        if (command === 'terminos') {
          await conn.sendMessage(m.chat, reglasYPoliticas, rcanal);
          console.log('Mensaje de normas enviado correctamente.');
        }

        // Responder con mensaje de privacidad si se usa el comando 'privacidad'
        if (command === 'privacidad') {
          let privacidadMessage = `┌───「 *Política de Privacidad del Bot* 」───┐
├ ✨ *1. Protección de Datos:*
│ - El bot no recopila datos personales sensibles de los usuarios.
│ - Solo se utiliza la información necesaria para operar correctamente.
├ ✨ *2. Uso de la Información:*
│ - Los datos del grupo se utilizan para responder a los comandos y mejorar el servicio.
│ - No se comparte ni se vende ninguna información a terceros.
├ ✨ *3. Transparencia:*
│ - Los usuarios pueden solicitar la eliminación de sus datos.
│ - No se realiza seguimiento fuera del uso de comandos del bot.
└────────────────────────────────────┈ ⳹
*Bot administrado por Deylin 🤖*
© Código creado por Deyin`;
          
          await conn.sendMessage(m.chat, privacidadMessage, rcanal);
          console.log('Mensaje de política de privacidad enviado correctamente.');
        }

        // Responder con mensaje de políticas si se usa el comando 'politica'
        if (command === 'politica') {
          let politicaMessage = `┌───「 *Política del Bot* 」───┐
├ ✨ *Uso Responsable:*
│ - No se permite el uso indebido del bot.
│ - Se debe evitar el abuso de comandos y el envío de mensajes innecesarios.
├ ✨ *Comportamiento:*
│ - Los usuarios deben comportarse de manera respetuosa y cordial.
│ - Cualquier abuso o incumplimiento puede resultar en una sanción.
└────────────────────────────────────┈ ⳹
*Bot administrado por Deylin 🤖*
© Código creado por Deyin`;

          await conn.sendMessage(m.chat, politicaMessage, rcanal);
          console.log('Mensaje de política enviado correctamente.');
        }
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  handler.help = ['terminos', 'politica', 'privacidad'];
  handler.tag = ['main'];
  handler.command = ['terminos', 'politica', 'privacidad'];

  export default handler;
});