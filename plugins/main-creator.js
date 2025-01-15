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

  // Información del usuario que usa el bot
  let userName = await conn.getName(m.sender); // Obtiene el nombre del usuario
  let userNumber = m.sender.split('@')[0]; // Número del usuario
  let userDescription = 'Usuario del bot';
  let userLabel = 'Confía en mí';
  let userEmail = 'no_disponible@example.com';
  let userLocation = 'Desconocido';
  let userWebsite = 'https://github.com/';
  let userBio = '"Viviendo la vida con el bot 🌟"';

  // Mensaje inicial
  let txt = `> _*Hola, este es el contacto de mi creador. Si tienes alguna duda o problema, puedes escribirle directamente.*_\n\n⚡ Información adicional incluida.`;

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

  let userVcard = `
BEGIN:VCARD
VERSION:3.0
N:;${userName};;;
FN:${userName}
ORG:${userDescription}
TEL;type=CELL;waid=${userNumber}:${PhoneNumber('+' + userNumber).getNumber('international')}
EMAIL:${userEmail}
ADR:;;${userLocation};;;;
URL:${userWebsite}
NOTE:${userBio}
END:VCARD`;

  // Enviar el mensaje y los contactos
  await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Contactos',
      contacts: [
        { vcard: creatorVcard },
        { vcard: userVcard },
      ],
    },
  });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['info'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;