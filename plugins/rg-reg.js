import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import axios from 'axios';
import moment from 'moment-timezone';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);

  if (user.registered === true) throw `*『✦』Ya estás registrado. Usa #unreg para volver a registrarte.*`;
  if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto. Usa:\n#reg Nombre.edad*\n\nEjemplo:\n#reg ${name2}.25*`;

  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw '*『✦』El nombre es obligatorio.*';
  if (!age) throw '*『✦』La edad es opcional. Inténtelo de nuevo.*';
  if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*';

  age = parseInt(age);
  if (age > 10000) throw '*『😏』Viejo/a Sabroso/a*';
  if (age < 5) throw '*『🍼』Ven aquí, te adoptaré!!*';

  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;
  global.db.data.users[m.sender].money += 600;
  global.db.data.users[m.sender].yenes += 10;
  global.db.data.users[m.sender].exp += 245;
  global.db.data.users[m.sender].joincount += 5;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);

  // Barra de progreso
  let progressStages = ['□□□□□ 0%', '■□□□□ 20%', '■■□□□ 40%', '■■■□□ 60%', '■■■■□ 80%', '■■■■■ 100%'];
  let progressMessage = await conn.sendMessage(m.chat, { text: progressStages[0] }, { quoted: m });

  for (let i = 1; i < progressStages.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
    await conn.sendMessage(m.chat, { edit: progressMessage.key, text: progressStages[i] });
  }

  // Mensaje de registro (se envía después de la barra de progreso)
  let regbot = `
👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🌸」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}
「⭐」𝗘𝗱𝗮𝗱: ${age} años
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 15 Yenes 💴
• 5 Coins 🪙
• 245 Experiencia ✨
• 12 Tokens ⚜️
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
Número de registro: ${sn}
`;

  await conn.sendMessage(m.chat, { text: regbot }, { quoted: m });
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;