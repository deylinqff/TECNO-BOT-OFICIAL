import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  // Información del creador
  let creatorName = 'WillZek';
  let creatorNumber = '50557865603'; // Número del creador sin símbolos
  let creatorDescription = 'Creador del bot';
  let creatorLabel = 'No hacer spam';
  let creatorEmail = 'soporte@example.com';
  let creatorLocation = '🌍 Planeta Vegeta';
  let creatorWebsite = 'https://youtube.com/@kakaroto-bot';
  let creatorBio = '"La vida es fea 🌹"';

  // Información del bot
  let botName = await conn.getName(conn.user.jid); // Obtiene el nombre del bot
  let botNumber = conn.user.jid.split('@')[0]; // Número del bot
  let botDescription = 'Soy un bot';
  let botLabel = 'Siempre activo';
  let botEmail = 'bot@example.com';
  let botLocation = '🌌 Internet';
  let botWebsite = 'https://github.com/The-King-Destroy/Yuki_Suou-Bot';
  let botBio = '"Siempre listo para ayudarte 🤖"';

  // Mensaje inicial
  let txt = `> _*Hola, este es el contacto de mi creador y del bot. Si tienes alguna duda o problema, puedes escribirle directamente al creador o consultar con el bot.*_\n\n⚡ Información adicional incluida.`;

  // Crear las tarjetas vCard
  let creatorVcard = `
BEGIN:VCARD
VERSION:3.0
N:;${creatorName};;;
FN:${creatorName}
ORG:${creatorDescription}
TEL;type=CELL;waid=${creatorNumber}:${PhoneNumber('+' + creatorNumber).getNumber('international')}
EMAIL:${creatorEmail}
ADR:;;${creatorLocation};;;;
URL:${creatorWebsite}
NOTE:${creatorBio}
END:VCARD`;

  let botVcard = `
BEGIN:VCARD
VERSION:3.0
N:;${botName};;;
FN:${botName}
ORG:${botDescription}
TEL;type=CELL;waid=${botNumber}:${PhoneNumber('+' + botNumber).getNumber('international')}
EMAIL:${botEmail}
ADR:;;${botLocation};;;;
URL:${botWebsite}
NOTE:${botBio}
END:VCARD`;

  // Enviar el mensaje y los contactos
  await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Contactos',
      contacts: [
        { vcard: creatorVcard },
        { vcard: botVcard },
      ],
    },
  });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['info'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;