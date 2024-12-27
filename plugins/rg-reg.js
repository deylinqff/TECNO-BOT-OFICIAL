import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🔧 ESTÁS REGISTRADO.\n\n*¿QUIERES REGISTRARTE DE NUEVO?*\n\nUSA ESTE COMANDO PARA ELIMINAR TU REGISTRO.\n*${usedPrefix}unreg* <Número de serie>`)
  if (!Reg.test(text)) return m.reply(`⚙️ FORMATO INCORRECTO.\n\nUSO DEL COMANDO: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.16*`)
  
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🔴 El NOMBRE NO PUEDE ESTAR VACÍO.')
  if (!age) return m.reply('🔴 LA EDAD NO PUEDE ESTAR VACÍO.')
  if (name.length >= 100) return m.reply('⚠️ El NOMBRE ES DEMASIADO LARGO.')
  age = parseInt(age)
  if (age > 100) return m.reply('🧓 EL USUARIO TIENE MÁS DE 100 AÑOS.')
  if (age < 5) return m.reply('🍼 EL USUARIO ES DEMASIADO JOVEN PARA JUGAR.')

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch(`https://i.ibb.co/V3Hsgcy/file.jpg`)).buffer()

  // Mensaje inicial de carga
  let loadingMessage = await m.reply(`🔄 *Cargando Registro...*\n\n⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0%`);

  // Barra de carga simulada con bloques de colores
  let progress = 10;
  let blocks = ['🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩'];

  let updateProgress = setInterval(async () => {
    let currentBlocks = blocks.slice(0, progress / 10).join(''); // Mostrar la cantidad adecuada de bloques
    let remainingBlocks = blocks.slice(progress / 10).join(''); // Bloques restantes para completar la barra
    let progressText = `🔄 *Cargando Registro...*\n\n${currentBlocks}${remainingBlocks} ${progress}%`;

    await loadingMessage.edit(progressText);

    if (progress >= 100) {
      clearInterval(updateProgress);
      
      let txt = `–  *R E G I S T R O - T E C N O*\n\n`
      txt += `┌  🧠  *NOMBRE* : ${name}\n`
      txt += `│  💻  *EDAD* : ${age} años\n`
      txt += `│  🔒  *NUMERO DE SERIE*\n`
      txt += `└  🌐  ${sn}`
      
      await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m);

      // Elimina el mensaje de carga después de completar
      await loadingMessage.delete();
      await m.react('✅');
    }

    progress += 10; // Incrementar el progreso
  }, 500); // Actualiza cada 500 ms

}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler