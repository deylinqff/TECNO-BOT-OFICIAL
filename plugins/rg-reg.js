import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)

    if (user.registered === true) {
        return m.reply(`⚠️ *𝙎𝙞𝙨𝙩𝙚𝙢 𝘼𝙡𝙚𝙧𝙩:*\n\n💾 _Ya estás registrado en el sistema._\n\n🔄 ¿Deseas registrarte nuevamente?\n\n🛠️ Usa el comando:\n*${usedPrefix}unreg* para eliminar tu registro actual.`)
    }

    if (!Reg.test(text)) return m.reply(`⚙️ *𝙀𝙧𝙧𝙤𝙧 𝘿𝙚 𝙁𝙤𝙧𝙢𝙖𝙩𝙤:*\n\n📌 *Formato incorrecto.*\n💡 Usa el comando de esta forma:\n${usedPrefix + command} *𝙣𝙤𝙢𝙗𝙧𝙚.𝙚𝙙𝙖𝙙*\n📋 Ejemplo: *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('❌ *𝙀𝙧𝙧𝙤𝙧:*\n📌 El campo *nombre* no puede estar vacío.')
    if (!age) return m.reply('❌ *𝙀𝙧𝙧𝙤𝙧:*\n📌 El campo *edad* no puede estar vacío.')
    if (name.length >= 100) return m.reply('❌ *𝙀𝙧𝙧𝙤𝙧:*\n📌 El nombre ingresado es demasiado largo.')

    age = parseInt(age)
    if (age > 100) return m.reply('❌ *𝙀𝙧𝙧𝙤𝙧:*\n📌 La edad ingresada no es válida.')
    if (age < 5) return m.reply('❌ *𝙀𝙧𝙧𝙤𝙧:*\n📌 La edad ingresada no es válida.')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : '🌐 *Desconocido*';

    let sn = createHash('md5').update(m.sender).digest('hex')

    // Inicializa barra de progreso
    let progressMsg = await conn.sendMessage(m.chat, { text: '□□□□□ 0% - *Inicializando registro...*' })
    let progress = ['□□□□□ 0%', '■□□□□ 20%', '■■□□□ 40%', '■■■□□ 60%', '■■■■□ 80%', '■■■■■ 100%']

    for (let i = 0; i < progress.length; i++) {
        await new Promise(res => setTimeout(res, 1000)) // Pausa entre actualizaciones
        await conn.updateMessage(m.chat, { id: progressMsg.key.id, remoteJid: m.chat }, { text: `${progress[i]} - *Procesando...*` })
    }

    // Elimina mensaje de progreso
    await conn.deleteMessage(m.chat, { id: progressMsg.key.id, remoteJid: m.chat })

    // Envía registro final
    let regbot = `╔═══════════════════╗\n`
    regbot += `  🔰 *CROWBOT REGISTRATION SYSTEM* 🔰\n`
    regbot += `╚═══════════════════╝\n\n`
    regbot += `💾 *Datos Registrados:*\n`
    regbot += `🔹 *Nombre:* ${name}\n`
    regbot += `🔹 *Edad:* ${age} años\n`
    regbot += `🔹 *País:* ${userNationality}\n\n`
    regbot += `🎁 *Recompensas Obtenidas:*\n`
    regbot += `✨ 15 Estrellas\n`
    regbot += `🪙 5 CrowCoins\n`
    regbot += `📈 245 Puntos de Experiencia\n`
    regbot += `🪙 12 Tokens\n\n`
    regbot += `💠 *¡Gracias por registrarte!*\n\n`

    await conn.sendMessage(m.chat, { text: regbot })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler