import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

llet Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)

    if (user.registered === true) {
        return m.reply(`⚡ *| 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗬𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼 |* ⚡\n\n▶ ¿𝗗𝗲𝘀𝗲𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲 𝗻𝘂𝗲𝘃𝗮𝗺𝗲𝗻𝘁𝗲?\n\n💡 Usa el comando:\n*${usedPrefix}unreg*  ➜ 𝘌𝘭𝘪𝘮𝘪𝘯𝘢𝘳 𝘵𝘶 𝘳𝘦𝘨𝘪𝘴𝘵𝘳𝘰.`)
    }

    if (!Reg.test(text)) return m.reply(`❌ *| ERROR: 𝗙𝗼𝗿𝗺𝗮𝘁𝗼 𝗶𝗻𝗰𝗼𝗿𝗿𝗲𝗰𝘁𝗼 |* ❌\n\n📄 Usᴏ ᴄᴏʀʀᴇᴄᴛᴏ: ${usedPrefix + command} [𝗻𝗼𝗺𝗯𝗿𝗲].[𝗲𝗱𝗮𝗱]\n🌐 Ejemplo: *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('⚠️ *| ERROR: El campo "𝗡𝗼𝗺𝗯𝗿𝗲" está vacío |* ⚠️')
    if (!age) return m.reply('⚠️ *| ERROR: El campo "𝗘𝗱𝗮𝗱" está vacío |* ⚠️')
    if (name.length >= 100) return m.reply('🚫 *| ERROR: El nombre ingresado es demasiado largo |* 🚫')

    age = parseInt(age)
    if (age > 100) return m.reply('❌ *| ERROR: La edad ingresada no es válida (mayor a 100 años) |* ❌')
    if (age < 5) return m.reply('❌ *| ERROR: La edad ingresada no es válida (menor a 5 años) |* ❌')

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
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `┏━━━━━━━━━━━━━━━━━━⬣
┃ ⌬ *𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 𝗘𝗟𝗘𝗖𝗧𝗥𝗢𝗡𝗜𝗖𝗢 - 𝗧𝗘𝗖𝗡𝗢* ⌬
┗━━━━━━━━━━━━━━━━━━⬣\n`
    regbot += `✦━━━━━━━━━━━━━✦\n`
    regbot += `• *𝐍𝐎𝐌𝐁𝐑𝐄:* ${name}\n`
    regbot += `• *𝐄𝐃𝐀𝐃:* ${age} 𝐚ñ𝐨𝐬\n`
    regbot += `• *𝐏𝐀Í𝐒:* ${userNationality}\n`
    regbot += `✦━━━━━━━━━━━━━✦\n`
    regbot += `✦ *RECOMPENSAS:* ✦\n`
    regbot += `• 🌟 *15 Estrellas*\n`
    regbot += `• 🪙 *5 CrowCoins*\n`
    regbot += `• 💸 *245 Exp*\n`
    regbot += `• 💰 *12 Tokens*\n`
    regbot += `✦━━━━━━━━━━━━━✦\n`

    await m.react('✅')
    await conn.sendLuffy(m.chat, '🎉 *| REGISTRO COMPLETADO |* 🎉', textbot, regbot, imagen1, imagen1, channel, m, rcanal)

    let channelID = '120363381910502266@newsletter';
    let messageContent = `✦ *USUARIO REGISTRADO* ✦\n• *𝐍𝐎𝐌𝐁𝐑𝐄:* ${name}\n• *𝐄𝐃𝐀𝐃:* ${age}\n• *𝐏𝐀Í𝐒:* ${userNationality}\n• *𝐍Ú𝐌𝐄𝐑𝐎 𝐃𝐄 𝐒𝐄𝐑𝐈𝐄:*\n⤷ ${sn}\n\n🎁 *¡𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼/𝗮! ¡𝗗𝗶𝘀𝗳𝗿𝘂𝘁𝗮 𝗱𝗲 𝘁𝘂𝘀 𝗯𝗲𝗻𝗲𝗳𝗶𝗰𝗶𝗼𝘀!*`

    await conn.sendMessage(channelID, {
        text: messageContent, ...rcanal
    });
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler