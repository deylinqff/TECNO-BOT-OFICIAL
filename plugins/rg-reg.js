import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  // Comprobación si el usuario ya está registrado
  if (user.registered === true) return m.reply(`🔧 ESTÁS REGISTRADO.\n\n*¿QUIERES REGISTRARTE DE NUEVO?*\n\nUSA ESTE COMANDO PARA ELIMINAR TU REGISTRO.\n*${usedPrefix}unreg* <Número de serie>`)

  // Validación de formato
  let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
  if (!Reg.test(text)) return m.reply(`⚙️ FORMATO INCORRECTO.\n\nUSO DEL COMANDO: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.16*`)
  
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🔴 El NOMBRE NO PUEDE ESTAR VACÍO.')
  if (!age) return m.reply('🔴 LA EDAD NO PUEDE ESTAR VACÍA.')
  if (name.length >= 100) return m.reply('⚠️ El NOMBRE ES DEMASIADO LARGO.')
  age = parseInt(age)
  if (age > 100) return m.reply('🧓 EL USUARIO TIENE MÁS DE 100 AÑOS.')
  if (age < 5) return m.reply('🍼 EL USUARIO ES DEMASIADO JOVEN PARA JUGAR.')

  // Estableciendo datos del usuario
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true

  // Barra de carga
  let loadingBar = '⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜';
  let progress = 0;
  
  let loadingMessage = await conn.sendMessage(m.chat, { text: `Registrando usuario...\n[${loadingBar}] 0%` });

  const updateBar = (step) => {
    progress += step;
    let filled = Math.floor(progress / 10);
    loadingBar = '🟩'.repeat(filled) + '⬜'.repeat(10 - filled);
    return `Registrando usuario...\n[${loadingBar}] ${progress}%`;
  };

  // Actualizando la barra de carga
  for (let i = 10; i <= 100; i += 20) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1 segundo
    await conn.sendMessage(m.chat, { 
      edit: loadingMessage.key, 
      text: updateBar(20) 
    });
  }

  // Eliminar mensaje de barra de carga
  await conn.sendMessage(m.chat, { delete: loadingMessage.key });

  // Generar número de serie y enviar el mensaje final
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch(`https://i.ibb.co/V3Hsgcy/file.jpg`)).buffer()
  let txt = `–  *R E G I S T R O - C R O W*\n\n`
      txt += `┌  🧠  *NOMBRE* : ${name}\n`
      txt += `│  💻  *EDAD* : ${age} años\n`
      txt += `│  🔒  *NUMERO DE SERIE*\n`
      txt += `└  🌐  ${sn}`
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)

  await m.react('✅')
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler