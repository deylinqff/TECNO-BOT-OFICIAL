import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];

  let name = conn.getName(userId);
  let estatus = user.description || 'No especificado';
  let genero = user.genre || 'No especificado';
  let pareja = user.marry || 'No especificado';
  let banco = user.bank || 0;
  let nivel = user.level || 0;
  let coins = user.coin || 0;

  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

let MenuText = `╭┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰➤
𝄄 𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 ${botname}
𝄄 ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ *Cliente* » @${userId.split('@')[0]}
││ *Banco* » ${banco}
││ *${moneda}* » ${coins}
││ *Género* » ${genero}
││ *Pareja* » ${pareja}
││ *Estado* » ${estatus}
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
𝄄 ✧ → ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ ᴜᴛɪʟɪᴢᴀ *!serbot* o *!serbot code*
𝄄
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ ✧ *Menú de Comandos* ✧
││ » De ${botname}
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Sockets 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!token • !gettoken*
││ ➣ Obtén el token del socket.
││
││ ✐ *!socket • !bots*
││ ➣ Ver todos los sockets activos.
││
││ ✐ *!serbot • !serbot code • !serbot --code*
││ ➣ Convierte en un socket.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info User 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!reg • !verificar • !register*
││ ➣ Registra tu nombre y edad en ${botname}.
││
││ ✐ *!unreg*
││ ➣ Elimina tu registro de ${botname}.
││
││ ✐ *!setgenre • !setgenero*
││ ➣ Establece tu género en el perfil de ${botname}.
││
││ ✐ *!delgenre • !delgenero*
││ ➣ Elimina tu género del perfil de ${botname}.
││
││ ✐ *!setbirth • !setnacimiento*
││ ➣ Establece tu fecha de nacimiento en el perfil de ${botname}.
││
││ ✐ *!delbirth • !delnacimiento*
││ ➣ Elimina tu fecha de nacimiento del perfil de  ${botname}.
││
││ ✐ *!setdescription • !setdesc*
││ ➣ Establece una descripción en tu perfil de ${botname}.
││
││ ✐ *!deldescription • !deldesc*
││ ➣ Elimina la descripción de tu perfil de ${botname}.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Creador 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!setname*
││ ➣ Cambia el name de ${botname}.
││
││ ✐ *!setmoneda*
││ ➣ Cambia la moneda de ${botname}.
││
││ ✐ *!setenlace*
││ ➣ Cambia el enlace de ${botname}.
││
││ ✐ *!setbanner*
││ ➣ Cambia la imagen del menú de ${botname}.
││
││ ✐ *!setcreador*
││ ➣ Cambia el owner de ${botname}.
││
││ ✐ *!addowner* [mension / etiquetar]
││ ➣ Agrega un numero como owner.
││
││ ✐ *!delowner* [mension / etiquetar]
││ ➣ Elimina un numero como owner.
││
││ ✐ *!bcgc*
││ ➣ El bot enviara la notificación que el dueño escribió.
││
││ ✐ *!banuser* [mension / etiquetar]
││ ➣ El bot ya no responde a los mensajes del usuario mencionando.
││
││ ✐ *!unbanuser* [mension / etiquetar]
││ ➣ El bot responde a los mensajes del usuario mencionando.
││
││ ✐ *!leave • !salir*
││ ➣ El bot sale del grupo.
││
││ ✐ *!enviarmsg • !enviarmsgcanal*
││ ➣ El bot envia mensaje a un canal de WhatsApp.
││
││ ✐ *!resetuser • !borrardatos* [mension / etiquetar]
││ ➣ Reestablese los datos del usuario mencionando.
││
││ ✐ *!creargc • !newgc*
││ ➣ El bot crea un grupo.
││
││ ✐ *!setcatalogo*
││ ➣ Cambia la imagen del catalogo.
││
││ ✐ *!settexto*
││ ➣ Cambia el texto del bot.
││
││ ✐ *!setdev*
││ ➣ cambia el dev del bot.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Descarga & Conversión 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!tourl*
││ ➣ Convierte imagen en url https:qu.ax.
││
││ ✐ *!toibb*
││ ➣ Convierte imagen en url https:ibb.co.
││
││ ✐ *!tocat*
││ ➣ Convierte imagen en url en https:catbox.moe.
││
││ ✐ *!tiktok • !tt*
││ ➣ Descarga videos de TikTok.
││
││ ✐ *!pinterest*
││ ➣ Busca y descarga imágenes de Pinterest.
││
││ ✐ *!play • !play2*
││ ➣ Descarga música/video de YouTube.
││
││ ✐ *!fb • !facebook*
││ ➣ Descarga videos de Facebook.
││
││ ✐ *!ig • !instagram*
││ ➣ Descarga contenido de Instagram.
││
││ ✐ *!imagen*
││ ➣ Busca y descarga imágenes desde Internet.
││
││ ✐ *!s • !sticker*
││ ➣ Realiza un sticker.
││
││ ✐ *!wm*
││ ➣ Cambiar el nombre del sticker.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Ai 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!ia • @chatgpt*
││ ➣ Habla con la V1 de ${botname}.
││
││ ✐ *!openai*
││ ➣ Habla con la V2 de ${botname}.
││
││ ✐ *!gemini*
││ ➣ Habla con gemini.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Buscadores 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!mercadolibre*
││ ➣ Busca artículos en mercado libre.
││
││ ✐ *!githubsearch*
││ ➣ Busca repositorios en github.
││
││ ✐ *!yts • !ytsearch*
││ ➣ Busca contenido en YouTube.
││
││ ✐ *!tiktoksearch • !tiktoks*
││ ➣ Busca contenido en tiktok.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Nsfw & +18 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!pack*
││ ➣ Una imagen random de mujer.
││
││ ✐ *!pack2*
││ ➣ Una imagen random de unos pechos de mujer.
││
││ ✐ *!pack3*
││ ➣ Imagen random de un hombre.
││
││ ✐ *!rule34*
││ ➣ contenido de rule34.
││
││ ✐ *!xnxxsearch*
││ ➣ Busca contenido de xnxx.
││
││ ✐ *!videoxxxlesbi • !videolesbixxx*
││ ➣ Video random de mujeres.
││
││ ✐ *!videoxxx*
││ ➣ video random de porno.
││
││ ✐ *!xnxxdl*
││ ➣ Descarga contenido de xnxx.
││
││ ✐ *!xvideosdl*
││ ➣ Descarga contenido de xvideos.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Rpg & Gacha 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!marry* [mension / etiquetar]
││ ➣ Propón matrimonio a otro usuario.
││
││ ✐ *!divorce*
││ ➣ divorcio con el usuario 
││
││ ✐ *!profile* [mension / etiquetar]
││ ➣ Muestra tu perfil de usuario o la de un usuario mencionando.
││
││ ✐ *!comprarpremium*
││ ➣ Usar el bot sin limíte
││
││ ✐ *!daily*
││ ➣ Pide recompensa diaria.
││
││ ✐ *!w*
││ ➣ Trabaja y obtén ${moneda}.
││
││ ✐ *!slut*
││ ➣ Protituirse y obtener ${moneda}.
││
││ ✐ *!crime*
││ ➣ Roba y obtén ${moneda}.
││
││ ✐ *!cf*
││ ➣ Apuesta y obtén ${moneda}.
││
││ ✐ *!rt*
││ ➣ black Jack (ruleta) y obtén ${moneda}.
││
││ ✐ *!rob* [mension / etiquetar]
││ ➣ Roba ${moneda} al usuario mencionando.
││
││ ✐ *!bank • !banco* [mension / etiquetar]
││ ➣ Revisa tu cuenta del banco o la de un usuario mencionando.
││
││ ✐ *!cartera • !wallet* [mension / etiquetar]
││ ➣ Revisa tu cartera o la de un usuario mencionando.
││
││ ✐ *!retirar • !wd* [cantidad(un número) / all]
││ ➣ Retira tus ${moneda} del banco.
││
││ ✐ *!dep • !aguardar* [cantidad(un número) / all]
││ ➣ Guarda tus ${moneda} en el banco.
││
││ ✐ *!mine • !minar*
││ ➣ Menete a minar y obten ${moneda}.
││
││ ✐ *!afk*
││ ➣ Si te mencionan el bot dara un breve mensaje.
││
││ ✐ *!rw*
││ ➣ Para reclamar un personaje.
││
││ ✐ *!c*
││ ➣ Reclama el personaje.
││
││ ✐ *!harem • !ob*
││ ➣ Rebisa tus personajes obtenidos.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
││
││ \`『 Info Grupos 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!link*
││ ➣ El bot envia el link del grupo.
││
││ ✐ *!mute* [mension / etiquetar]
││ ➣ El bot elimina los mensajes del usuario.
││
││ ✐ *!unmute* [mension / etiquetar]
││ ➣ El bot deja de eliminar los mensajes del usuario.
││
││ ✐ *!grupo • !group* [open / abrir]
││ ➣ Cambia ajustes del grupo para que todos los usuarios envien mensaje.
││
││ ✐ *!grupo • !gruop* [close / cerrar]
││ ➣ Cambia ajustes del grupo para que solo los administradores envien mensaje.
││
││ ✐ *!kick* [número / mension]
││ ➣ Elimina un usuario de un grupo.
││
││ ✐ *!add* [número]
││ ➣ Invita a un usuario a tu grupo.
││
││ ✐ *!promote* [mension / etiquetar]
││ ➣ El bot dara administrador al usuario mencionando.
││
││ ✐ *!demote* [mension / etiquetar]
││ ➣ El bot quitara administrador al usuario mencionando.
││
││ ✐ *!banchat*
││ ➣ El administrador apsga a ${botname}.
││
││ ✐ *!unbanchat*
││ ➣ Un administrador enciende a ${botname}.
││
││ ✐ *!poll • !encuesta*
││ ➣ El bot crea una encuesta.
││
││ ✐ *!hidetag*
││ ➣ Envia un mensaje mencionando a todos los usuarios
││
││ ✐ *!del • !delete*
││ ➣Elimina un mensaje mencionando 
││
││ ✐ *!fantasmas*
││ ➣ Revisión de usuarios sin enviar mensajes 
││
││ ✐ *!kickfantasmas*
││ ➣ Elimina a los usuarios que no an enviando mensajes 
││
││ ✐ *!tangall*
││ ➣ etiqueta a todos los usuarios 
││
││ ✐ *!kicknum* [+52/+54/+51]
││ ➣ Elemina a los usuarios con un prefijo
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
││
││ \`『 Info Games 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!cancion*
││ ➣ Pide una canción responde y gana ${moneda}
││
││ ✐ *!pista • !hint*
││ ➣ Pide pista para responder tu canción 
││
││ ✐ *!ppt* [piedra/papel/tijera]
││ ➣ Juega ppt contra el bot y gana ${moneda}
││
││ ✐ *!acertijo*
││ ➣ Pide un acertijo responde y gana ${moneda}
││
││ ✐ *!mates • !math*
││ ➣ Responde a una pregunta matemática y gana ${moneda}
││
││ ✐ *!sopa • !soup*
││ ➣ Pide una sopa de letras responde y gana ${moneda}
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Tools 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!hd*
││ ➣ Sube la calidad de tu imagen
││
││ ✐ *!read • !revelar*
││ ➣ El bot reenvia la foto o video de una sola vista
││
││ ✐ *!toimg*
││ ➣ El bot convierte un sticker a imagen
││
││ ✐ *!tomp4*
││ ➣ El bot convierte un sticker con movimiento a video
││
││ ✐ *!quemusica • !whatmusic*
││ ➣ Envia un audio o video y el bot investigara su información 
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ \`『 Info Audios 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ❀ No Hace Falta Poner El ! o ningun otro prefijo
││
││ ✐ \`*uwu • UwU*\`
││ ➣ Envia audio de nestras ayudantes
││
││ ✐ \`*onichan • oni-chan*\`
││ ➣ Envia audio de nuestras ayudantes
││
││ ✐ \`*fino señores*\`
││ ➣ Envia audio de fino señores
││
││ ✐ \`*sad*\`
││ ➣ Envia audio tristre
││
││ ✐ \`*buenos dias*\`
││ ➣ Envia audio
││
││ ✐ \`*buenas tardes*\`
││ ➣ Envia audio 
││
││ ✐ \`*buenas noches*\`
││ ➣ Envia audio
││
││ ✐ \`*bot puto • bot malpatido*\`
││ ➣ Envia audio
││
││ ✐ \`*rawr • rarw*\`
││ ➣ Envia audio
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
││╭╴╴╴╴╴╴
││ \`『 Info Bot 』\`
│╞═════𖠁☄︎𖠁═════
││
││ ✐ *!tyc*
││ ➣ Términos y condiciones de ${botname}.
││
││ ✐ *!script*
││ ➣ Datos del bot original.
││
││ ✐ *!hostingpy • !skyplus • !tk-host • !Hosting • !host*
││ ➣ Los hosts oficiales de ${botname}.
││
││ ✐ *!ping • !p*
││ ➣ La velocidad de ${botname}.
││
││ ✐ *!staff*
││ ➣ El equipo de desarrollo de ${botname}.
││
││ ✐ *!addprem* [mension / etiquetar]
││ ➣ Un dueño da premium al usuario.
││
││ ✐ *!delprem* [mension / etiquetar]
││ ➣ Un dueño le quitara premium al usuario.
││
││ ✐ *!autoadmin*
││ ➣ El bot dara administrador al dueño.
││
│╰╴╴╴╴╴╴
╰┉꙰╾‌━ٜ͙͙͙͙͙┅ٜ͙͙͙͙┉ٜ͙͙͙͙͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙•●᪱•ٜ┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙┄ٜ͙͙͙͙͙┉ٜ͙͙͙͙͙͙┅ٜ͙͙͙͙͙━͙͙͙͙╾‌ࣩ┉꙰╮
╭─‌┈‌ׅ┉‌ׁ‌┈┉ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ┉‌ׁ‌┈‌ׅ─‌╯
│╭╴╴╴╴╴╴
││ *✰ ${dev}*
│╞═════𖠁☄︎𖠁═════
││ *» ${pickRandom(global.piropo)}*
│╰╴╴╴╴╴╴
╰─┈➤ ${botname}
  `.trim();

  await conn.sendMessage(m.chat, { 
    text: MenuText,
    contextInfo: {
      mentionedJid: [userId],
      externalAdReply: {
        title: botname,
        body: textbot,
        thumbnailUrl: banner,
        sourceUrl: enlace,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'allmenu', 'menú', 'help'];

export default handler;

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
global.piropo = ["Si tu cuerpo fuera cárcel y tus labios cadena, qué bonito lugar para pasar mi condena.", "!Lo tuyo es un dos por uno, además de guapa eres simpática!", "Fíjate como es la ciencia que ahora hasta hacen bombones que andan.", "Por la luna daría un beso, daría todo por el sol, pero por la luz de tu mirada, doy mi vida y corazón.", "Si yo fuera un avión y tu un aeropuerto, me la pasaría aterrizando por tu hermoso cuerpo.", "Tantas estrellas en el espacio y ninguna brilla como tú.", "Me gusta el café, pero prefiero tener-té.", "No eres Google, pero tienes todo lo que yo busco.", "Mis ganas de ti no se quitan, se acumulan.",  "Te regalo esta flor, aunque ninguna será jamás tan bella como tú.", "Cuando te multen por exceso de belleza, yo pagaré tu fianza.", "Si cada gota de agua sobre tu cuerpo es un beso, entonces quiero convertirme en aguacero.", "Estás como para invitarte a dormir, y no dormir.", "Si tu cuerpo fuera cárcel y tus brazos cadenas, ese sería el lugar perfecto para cumplir condena.",  " Cómo podría querer irme a dormir si estás tú al otro lado de la pantalla?", "Quisiera ser hormiguita para subir por tu balcón y decirte al oído: guapa, bonita, bombón.", "En mi vida falta vida, en mi vida falta luz, en mi vida falta alguien y ese alguien eres tú.", "Señorita, si supiera nadar, me tiraría en la piscina de tus ojos desde el trampolín de sus pestañas.", "Señorita disculpe, pero la llaman de la caja... –Qué caja?... –De la caja de bombones que te escapaste", "Eres tan hermosa que te regalaría un millón de besos y si no te gustasen te los aceptaría de regreso.", "Eres tan bonita que Dios bajaría a la tierra tan solo para verte pasar.", "¡Eres como una cámara Sony! Cada vez que la miro no puedo evitar sonreir.", "En una isla desierta me gustaría estar y sólo de tus besos poderme alimentar.", "Si fueras lluvia de invierno, yo cerraría el paraguas para sentirte en mi cuerpo.", "Me gustas tanto, tanto, que hasta me gusta estar preso, en las redes de tu encanto.", "Si te pellizco seguro que te enojas pero si me pellizcas tu, seguro que me despierto.", "No son palabras de oro ni tampoco de rubí, son palabras de cariño que compongo para usted.", "Te invito a ser feliz yo pago.", "Cuando caminas no pisas el suelo, lo acaricias.", "Nos veríamos lindo en un pastel de boda juntos.", "Tantas formas de vida y yo solo vivo en sus ojos.", "¿A qué numero llamo si quiero marcarte de por vida?", "Me gustas tanto que no se por donde empezar a decírtelo.", "Todos se quedan con tu físico, pero yo prefiero tu corazón.", "Hola si te gustan los idiomas cuando quieras te enseño mi lengua.", "Dime por donde paseas para besar el suelo que pisas, preciosidad!", "Tu belleza me enciega porque viene desde su corazón y se refleja en tus ojos.", "Eres de esa clase de personas, por las cuales a las estrellas se les piden deseos.", "Si alguna vez te han dicho que eres bella te mintieron, no eres bella eres hermosa.", "Celeste es el cielo, amarilla la nata y negros son los ojos de la chica que me mata.", "Si yo fuera Colón navegaría día y noche para llegar a lo más profundo de tu corazón.", "Cinco calles he cruzado, seis con el callejón, sólo me falta una para llegar a tu corazón.", "Si fueras mi novia me volvería ateo ¿ Por que? Porque no tendría nada más que pedirle a Dios.", "A una hermosa niña acompañada de la madre: ¡Que linda flor, lástima que venga con la maceta!", "Si me dedicas una sonrisa pasas de ser linda a perfecta.", "¿Qué pasó en el cielo que se están cayendo los ángeles?", "¡Te voy a poner una multa!. ¿Por qué? Por exceso de belleza.", "Como se habrán querido tus padres... por haberte hecho tan bonita.", "Por qué el cielo está nublado? Porque todo el azul está en tus ojos.", "¿Tienes alguna herida, guapa ? Tiene que ser duro caerse del cielo.", "Tus ojos son verdes los míos café, los míos te quieren los tuyos no sé.", "Cuando el día se nubla, no extraño al sol, porque lo tengo en tu sonrisa.", "Pasa una mujer y dice adiós... -a DIOS lo vi cuando me miraron tus ojos!", "En otras partes del mundo se están quejando, porque el sol está acá nada mas.", "Aprovecha que estoy en rebaja guapa y te dejo dos besos por el precio de uno. Dios se pasó al crearte a ti.", "Al amor y a ti los conocí al mismo tiempo.", "Si la belleza fuese tiempo, tú serías 24 horas.", "Si algún día te pierdes, búscate en mis pensamientos!", "Si amarte fuera pecado, tendría el infierno asegurado.", "Eres lo único que le falta a mi vida para ser perfecto.", "Eres la única estrella que falta en el cielo de mi vida!", "Ahora que te conozco, no tengo nada mas que pedirle a la vida!", "Voy a tener que cobrarte alquiler, porque desde que te vi no has dejado de vivir en mis sueños.", "Me gustaría ser tu almohada, para que me abraces todas las mañanas.", "No te digo palabras bonitas, sino un verso sincero: mi amor por ti es infinito y mi corazón es verdadero.", "Lo que siento por ti es tan inmenso que, para guardarlo, me haría falta otro universo.", "Las matemáticas siempre dicen la verdad: tú y yo juntos hasta la eternidad.", "Que fácil sería cumplir una condena si tu cuerpo fuera cárcel y tus brazos cadenas.", "Mi madre me dijo que no debía pecar, pero por ti estoy dispuesta a confesarme.", "No se trata del whisky ni la cerveza, eres tú quien se me ha subido a la cabeza.", "De noche brilla la luna, y de día brilla el sol, pero tus ojos bonitos alumbran mi corazón.", "No me busques, prefiero seguir perdido en tu mirada.", "Unos quieren el mundo, otros quieren el sol, pero yo solo quiero un rincón en tu corazón.", "Te dejaré de amar a partir del día que encuentre el alfiler que ahora tiro al mar.", "Bienaventurados los borrachos, porque ellos te verán dos veces.", "Como avanza la ciencia si ya las flores caminan.", "Tanta curva y yo sin frenos.", "Si Adán por Eva se comió una manzana, yo por Ti me comería una frutería.", "Si yo fuera astronauta te llevaría a Plutón, pero como no lo soy te llevo siempre en mi corazón.", "Tú debes ser atea, porque estás como quieres y no como Dios manda.", "Si que está avanzada la ciencia; que hasta los bombones caminan.", "¿De qué juguetería te escapaste?, ¡muñeca!", "Ayer pasé por tu casa y me tiraste un ladrillo … mañana pasaré de nuevo para construirte un castillo.", "¿Te dolió caer del cielo… angelito?", "Tu madre debía de ser pastelera porque un bombón como tú no lo hace cualquiera.", "Tu papá debe ser un pirata, porque tú eres un tesoro!", "Siempre escucho decir a las personas que Disneyland es el lugar más feliz del mundo. Pero me pregunto ¿si han estado alguna vez a tu lado?", "Por algún motivo, hoy me sentía un poco mal. Pero cuando te vi llegar, me excitaste y se me fue todo el malestar.", "¿Sabes si hay un aeropuerto por aquí cerca o mi corazón está despegando?", "¿Tu papá era boxeador? ¿NO? ¡Porque maldita sea tengo que decírtelo!, eres un nocaut (K.O.)!", "¡Ohh Dios mío! ¿Tienes un corazón extra?. Por que el mío acaba de ser robado.", "Aparte de ser increíblemente sexy, ¿a qué te dedicas?", "¿Acaba de salir el sol o simplemente me sonreíste?", "Tienes que besarme si me equivoco, ¿los dinosaurios todavía existen?", "Oye, eres linda y yo lindo. Juntos seríamos bastante lindos.", "Estoy seguro que tu nombre debe ser Google. ¿Sabes porque? Por que tienes absolutamente todo lo que estaba buscando!", "Estoy seguro que tu padre es extraterrestre ¡Porque no he visto nada como tú en la Tierra!", "Por favor no te asustes con esta pregunta pero… ¿Tu padre era un ladrón? Porque alguien robó las estrellas del cielo y las puso en tus ojos bebota.", "¿Tienes un lápiz y una goma? Porque quiero borrar tu pasado y escribir nuestro futuro.", "No necesitas llaves para volverme loco.", "Lo siento, pero me debes un trago. [¿Por qué?] Porque cuando te miré, me dejaste hipnotizado y tire mi trago!", "Debes ser una escoba, porque acabas de derribarme.", "Adelante, siente mi camisa. ¡Está hecho de material de novio!", "¿Crees en el amor a primera vista? ¿O tendría pasar frente a ti de nuevo?", "Estoy estudiando sobre fechas importantes en la historia. ¿Quieres ser una de ellas?", "Discúlpame pero.. Tu ¿Eres un préstamo? ¡Porque tienes todo mi interés!", "Si soy vinagre, entonces debes ser bicarbonato de sodio. ¡Porque me haces sentir burbujeante por dentro!", "Por un segundo pensé que estaba muerto y me ido al cielo. Ahora veo que todavía vivo, pero el cielo me ha sido traído.", "¿Puedo pedirte un beso? Te juro que te lo devolveré.", "Por favor deja de ser tan dulce! Me estás dando dolor de muelas!", "¡Eres como mi taza de café favorita, caliente y para relamerse los labios!", "¿Eres una cámara? Porque cada vez que te miro, sonrío.", "¿Sabes qué te quedaría realmente bien? Yo.", "No necesito Twitter, ya te estoy siguiendo.", "Tiene que darme tu nombre para saber qué gritar esta noche.", "Es un hecho!. Ya te encuentras en mi lista de cosas por hacer esta noche imposible de que te me escapes!", "¿Sabes qué hay en el menú de rico? Bueno, Tu y yo baby!", "Tus labios se ven muy solitarios y secos. Permíteme presentarte los míos.", "Si nada dura para siempre, ¿serás mi nada?", "¿Tienes un nombre? ¿O puedo llamarte mía?", "¿Has estado cubierta de abejas recientemente? Solo lo asumí, porque te ves más dulce que la miel.", "Debe haber algo mal en mis ojos. No puedo dejar de mirarte.", "Eres como el fuego. Porque estás súper caliente.", "Con mis amigos apostamos a que no podría entablar una conversación con la mujer más guapa del bar. Bueno y ahora ¿Qué deberíamos hacer con su dinero?", "Bueno, aquí estoy tu deseo fue cumplido. Ahora bien.. ¿Cuáles son tus otros 2 deseos para el genio de la lampara?", "Mira… no soy matemático, pero soy bastante bueno con los números. Por que no me das tu numero y te enseño lo que puedo hacer con él.", "¿Eres una viajera en el tiempo? ¡Porque te veo en mi futuro!", "Si tú y yo fuéramos calcetines, ¡haríamos un gran par!", "Aparte de ser increíblemente hermosa, ¿a qué te dedicas?", "¿Quieres una pasa? ¿No? Bueno, ¿Qué tal una cita?", "Puede que no sea fotógrafo. Pero puedo imaginarnos totalmente juntos.", "Tu debes ser una maga. ¿No? Es raro porque cada vez que te miro, mágicamente todos desaparecen!", "Quiero que nuestro amor sea como el número Pi: irracional y sin fin.", "Estoy escribiendo un libro sobre todas las cosas buenas de la vida y tu estas en la primera pagina.", "Tú eres la razón por la que incluso Santa tiene una lista traviesa.", "¿Dónde te he visto antes? Oh sí, ahora lo recuerdo. ¡Estaba en el diccionario junto a la palabra MAGNÍFICO!", "No siempre fui religioso. Pero lo soy ahora, porque eres la respuesta a todas mis oraciones.", "Debes de estar exhausto. Has estado corriendo por mi mente todo el día.", "Hay algún problema con mi teléfono. No tiene tu número en él.", "Soy nuevo en la ciudad. ¿Podría darme indicaciones para llegar a su apartamento?", "¿Eres mi cargador de teléfono? Porque sin ti me moriría.", "Disculpe, ¿sabe cuánto pesa un oso polar? ¿No? Yo tampoco pero rompe el hielo.", "Imagina esto unos segundos: ¿No crees que nos veríamos tiernos en un pastel de bodas con nuestras caras en el?", "Solamente una cosa cambiaria de ti, y ese es tu apellido por el nuestro.", "Lo siento! Pero tengo que pedirte que te vayas de aquí!. Estás haciendo quedar mal a las otras chicas ¿No te da vergüenza?", "Perdona pero, ¿Podrías sostener mi brazo? Así puedo decirles a mis amigos que me ha tocado un ángel en la tierra!", "Hola, estoy escribiendo una guía telefónica, ¿puedo darme su número?", "Hola ¿Te conozco? Porque te pareces demasiado a mi futura novia.", "Entonces, cuando nuestros amigos nos pregunten cómo nos conocimos, ¿Qué les diremos?", "¿Cuáles son tus prioridades el domingo?: ¿Dormir, ejercitarte o una avalancha de mimos?", "Mie@»!# Creo que he perdido mi número, ¿Puedo tener tu número?", "Si Internet Explorer es tan valiente como para pedirme que sea mi navegador predeterminado, yo también soy lo suficientemente valiente para invitarte a salir.", "¿Ves a mi amigo allá? El pregunta si crees que soy lindo.", "¡Dios!!! Eres tan hermosa que lograste que me olvidara lo que iba a decirte.", "Hola, mi nombre es [tu nombre], pero puedes llamarme esta noche.", "Oye, ¿tienes un par de minutos para que ligue contigo?", "¿Eres un punto de acceso Wi-Fi? Porque siento una conexión.", "No busques mas!. En una escala del 1 al 10, eres un 9…seguro y yo soy el 1 que necesitas para el 10.", "No se que esta pasando ¿Hubo un terremoto o simplemente sacudiste mi mundo?", "¿De casualidad eres religiosa? Porque eres la respuesta a todas mis oraciones.", "¿Eres Netflix? Porque podría quedarme despierto observándote cuatro horas.", "Tengo que decírtelo tu te pareces mucho a mi próxima alma gemela.", "¿Puedo tener tu foto para mi lista de navidad de regalos que pediré a Santa?", "Si tú y yo fuéramos calcetines seguro que haríamos un gran par.", "¿Espero que no te moleste si te sigo? Mi madre siempre me dijo que siguiera mis sueños.", "Acabas de dejar caer algo … mi mandíbula.", "He estado mirando tu foto de perfil durante años. Todavía no puedo parar.", "¿Eres una obra de arte? Porque me gustaría clavarte en mi pared. ¡Guauu!", "Después de mirarte durante 0,7 segundos, me duele la cabeza. Puede tener dolor de cabeza al mirar algo tan brillante.", "Eres el tipo de chica que mi mamá me dijo que le trajera. ¿Te gustaría ir a verla conmigo?", "Hola mi nombre es Will…soy la gran voluntad de Dios solo para ti.", "Tu rostro es perfecto… como una obra de arte bien armada. Dios hizo un gran trabajo contigo.", "Te miro y solo puedo imaginar lo feliz que será mi vida, despertando a tu lado cada mañana.", "Tus ojos son hermosos. ¿Llevas lentes de contacto? (Solo diga esto siempre y cuando no use lentes de contacto).", "¿Puedo compartir una historia con ustedes? (Adelante, cuéntele la historia de un hombre que dio todo para que una mujer se enamorara de él, dígale que usted es ese hombre y ella esa mujer).", "¿Me estaba sonriendo o acababa de salir el sol?", "Tus ojos me han dicho muchas cosas. Pero lo que no me dicen es tu nombre.", "Vi un jardín esta mañana y pensé que era el más hermoso hasta que te conocí.", "¡Debo estar en el cielo porque estoy mirando a un ángel!", "Debe haber algo mal en mis ojos, no puedo quitárselos.", "Nunca jugaría al escondite contigo porque alguien como tú es imposible de encontrar.", "Puedes caer del cielo, puedes caer de un árbol, pero la mejor manera de caer… es enamorado de mí.", "¿Tienes un nombre o simplemente puedo llamarte mía?", "Me voy a quejar a Spotify porque no eres el single más popular de esta semana.", "Las rosas son rojas como mi cara pero eso solo pasa cuando estoy cerca de ti.", "Me gustaría invitarte al cine pero no permiten bocadillos!" ]
