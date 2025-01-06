/* Creditos a https://github.com/ALBERTO9883/NyanCatBot-MD */

const handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn); // Notificar que el usuario no tiene permisos
    throw false;
  }

  // Mapeo para interpretar los argumentos del comando
  const isClose = {
    'open': 'not_announcement',
    'buka': 'not_announcement',
    'on': 'not_announcement',
    '1': 'not_announcement',
    'close': 'announcement',
    'tutup': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[args[0]?.toLowerCase()]; // Asegurarse de manejar argumentos en minúsculas

  if (isClose === undefined) {
    const caption = `
*• Ejemplo:*
*${usedPrefix + command} open 1*
*${usedPrefix + command} close 1*
📌 *_Ejemplo de uso:_* *${usedPrefix + command} close 1* 
*_🌿 Para que el grupo esté cerrado por una hora._*
`;
    m.reply(caption);
    throw false;
  }

  // Validar el segundo argumento como número
  const timeArg = parseFloat(args[1]);
  if (isNaN(timeArg) || timeArg <= 0) {
    m.reply(`⚠️ *_Por favor, ingresa un número válido para el tiempo (en horas)._*\n\n*Ejemplo:* ${usedPrefix + command} close 1`);
    throw false;
  }

  // Calcular el tiempo en milisegundos
  const timeoutset = timeArg * 3600000; // Conversión de horas a milisegundos

  // Actualizar la configuración del grupo
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
    m.reply(`⚠️ *_Grupo ${isClose === 'announcement' ? 'cerrado' : 'abierto'}${timeArg ? ` durante *${clockString(timeoutset)}_*` : ''}_*`);
  });

  // Programar la reversión si se especificó un tiempo
  if (timeArg) {
    setTimeout(async () => {
      const revertTo = isClose === 'announcement' ? 'not_announcement' : 'announcement';
      await conn.groupSettingUpdate(m.chat, revertTo).then(async (_) => {
        conn.reply(
          m.chat,
          `${revertTo === 'not_announcement' ? '*El grupo se ha abierto, ¡ahora todos los miembros pueden enviar mensajes!*' : '*El grupo ha sido cerrado, ¡ahora solo los administradores pueden enviar mensajes!*'}`,
        );
      });
    }, timeoutset);
  }
};

handler.help = ['grupotime *<open/close>* *<número>*'];
handler.tags = ['grupo'];
handler.command = /^(grouptime|grupotiempo|grupotime)$/i;

handler.botAdmin = true; // El bot debe ser administrador
handler.group = true; // El comando solo funciona en grupos

export default handler;

// Función para convertir milisegundos a formato hh:mm:ss
function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
}