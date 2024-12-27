import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)

    if (user.registered === true) {
        return m.reply(`⚙️ Ya estás registrado.\n\n¿Deseas volver a registrarte?\n\nUsa este comando para eliminar tu registro:\n*${usedPrefix}unreg*`)
    }

    if (!Reg.test(text)) return m.reply(`⚠️ Formato incorrecto.\n\nUso del comando:\n${usedPrefix + command} <nombre>.<edad>\nEjemplo: *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('⚙️ El nombre no puede estar vacío.')
    if (!age) return m.reply('⚙️ La edad no puede estar vacía.')
    if (name.length >= 100) return m.reply('⚙️ El nombre es demasiado largo.')

    age = parseInt(age)
    if (age > 100) return m.reply('⚠️ La edad ingresada es incorrecta.')
    if (age < 5) return m.reply('⚠️ La edad ingresada es incorrecta.')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date()
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
    let userNationality = userNationalityData ? `${userNationalityData.name} (${userNationalityData.emoji})` : 'Desconocido';

    let sn = createHash('md5').update(m.sender).digest('hex')

    // Barra de carga
    let loadingBar = '⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜';
    let progress = 0;

    let loadingMessage = await conn.sendMessage(m.chat, { text: `Cargando registro...\n[${loadingBar}] 0%` });

    const updateBar = (step) => {
        progress += step;
        let filled = Math.floor(progress / 10);
        loadingBar = '🟩'.repeat(filled) + '⬜'.repeat(10 - filled);
        return `Cargando registro...\n[${loadingBar}] ${progress}%`;
    };

    for (let i = 10; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { 
            edit: loadingMessage.key, 
            text: updateBar(20) 
        });
    }

    // Eliminar mensaje de barra de carga
    await conn.sendMessage(m.chat, { delete: loadingMessage.key });

    // Mensaje de registro
    let regbot = `╭─━─━─━─━─━─━─━─━─━─━─╮\n`
    regbot += `┃ 🎲 *REGISTRO EXITOSO* 🎲\n`
    regbot += `╰─━─━─━─━─━─━─━─━─━─━─╯\n`
    regbot += `🖥️ *Usuario:* ${name}\n`
    regbot += `📡 *Edad:* ${age} años\n`
    regbot += `🌐 *País:* ${userNationality}\n`
    regbot += `\n─── *RECOMPENSAS* ───\n`
    regbot += `★ 600 CrowCoins\n`
    regbot += `★ 10 Estrellas\n`
    regbot += `★ 245 XP\n`
    regbot += `★ 5 Tokens\n`
    regbot += `──────────────────────\n`
    regbot += `🔒 *Número de serie:*\n⤷ ${sn}`

    await conn.sendMessage(m.chat, { text: regbot })

    let channelID = '120363381910502266@newsletter';
    let messageContent = `🌌 *NUEVO REGISTRO*\n\n🔷 *Usuario:* ${name}\n🔷 *País:* ${userNationality}\n🔷 *Edad:* ${age} años\n🔷 *N° de serie:*\n⤷ ${sn}\n\n💰 *Recompensa:* 600 CrowCoins.\n¡Bienvenido/a!`

    await conn.sendMessage(channelID, { text: messageContent })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler