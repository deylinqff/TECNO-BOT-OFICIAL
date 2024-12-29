import fetch from 'node-fetch';

let handler = async (m, { conn, command, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '⚠️ *Ingrese el link de una página.*', m);
    }

    try {
        await m.react('⏳'); // Icono de "cargando"
        conn.reply(m.chat, '🚀 Buscando su información...', m);

        // Verificamos si la URL es válida
        let url = args[0];
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return conn.reply(m.chat, '⚠️ *El link debe empezar con http:// o https://*', m);
        }

        // Hacemos la captura de pantalla
        let ss = await fetch(`https://image.thum.io/get/fullpage/${url}`);
        if (!ss.ok) throw new Error('Error al obtener la captura');

        let buffer = await ss.buffer();

        // Enviamos el archivo
        await conn.sendFile(m.chat, buffer, 'captura.png', `🌐 Captura de: ${url}`, m);
        await m.react('✅'); // Icono de "hecho"

    } catch (e) {
        console.error(e); // Imprime el error en la consola para depuración
        await m.react('❌'); // Icono de "error"
        return conn.reply(m.chat, '⚙️ Ocurrió un error al procesar la solicitud.', m);
    }
};

// Definimos los metadatos del comando
handler.help = ['ssweb', 'ss'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'ss'];

export default handler;