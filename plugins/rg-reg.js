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
  if (!age) return m.reply('🔴 LA EDAD NO PUEDE ESTAR VACÍA.')
  if (name.length >= 100) return m.reply('⚠️ El NOMBRE ES DEMASIADO LARGO.')
  age = parseInt(age)
  if (age > 100) return m.reply('🧓 EL USUARIO TIENE MÁS DE 100 AÑOS.')
  if (age < 5) return m.reply('🍼 EL USUARIO ES DEMASIADO JOVEN PARA JUGAR.')
  
  // Creación del mensaje de carga
  let loadingMessage = await m.reply('🔄 Cargando el registro... ⬜⬜⬜⬜⬜⬜⬜')
  
  // Variables de la barra de carga
  let progress = 10
  let progressBar = '⬜⬜⬜⬜⬜⬜⬜' // 7 bloques de la barra de carga
  
  // Intervalo para simular la carga progresiva
  let interval = setInterval(async () => {
    // Rellenamos la barra de progreso con 🟩 según el avance
    let filledBlocks = '🟩'.repeat(progress / 10)
    let emptyBlocks = '⬜'.repeat(7 - progress / 10)
    progressBar = filledBlocks + emptyBlocks

    // Actualizamos el mensaje de carga con el progreso actual
    await conn.sendMessage(m.chat, {
      text: `🔄 Cargando el registro... ${progressBar}\nProgreso: ${progress}%`
    }, { quoted: loadingMessage })
    
    if (progress === 100) {
      clearInterval(interval)
      // Continuamos con el proceso de registro
      user.name = name.trim()
      user.age = age
      user.regTime = + new Date
      user.registered = true
      let sn = createHash('md5').update(m.sender).digest('hex')
      let img = await (await fetch(`https://i.ibb.co/V3Hsgcy/file.jpg`)).buffer()
      let txt = `–  *R E G I S T R O - C R O W*\n\n`
          txt += `┌  🧠  *NOMBRE* : ${name}\n`
          txt += `│  💻  *EDAD* : ${age} años\n`
          txt += `│  🔒  *NUMERO DE SERIE*\n`
          txt += `└  🌐  ${sn}`
      await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
      await m.react('✅')
      await loadingMessage.delete() // Borrar mensaje de carga
    } else {
      progress += 10 // Incrementar progreso
    }
  }, 1000) // Intervalo de 1 segundo
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler