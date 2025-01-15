import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  let name = 'WillZek'; // Nombre del creador
  let number = '50557865603'; // Número del creador sin símbolos adicionales
  let description = 'Es Un Bot 🍬'; // Descripción del contacto
  let label = 'No hacer spam'; // Etiqueta del contacto
  let email = 'soporte@example.com'; // Correo del creador
  let location = '🌍 Planeta Vegeta'; // Ubicación
  let website = 'https://youtube.com/@kakaroto-bot'; // Sitio web
  let bio = '"La vida es fea 🌹"'; // Biografía del creador

  let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${description}
TEL;type=CELL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL:${email}
ADR:;;${location};;;;
URL:${website}
NOTE:${bio}
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [{ vcard }],
    },
  });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['info'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;