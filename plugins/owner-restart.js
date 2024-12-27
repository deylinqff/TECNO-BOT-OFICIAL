import { spawn } from 'child_process';

let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) throw '*『✦』Reiniciar: node start.js*\n*『✦』Reiniciar: node index.js*';

    if (conn.user.jid === conn.user.jid) {
        // Mensajes de progreso
        const progreso = [
      "♻️iniciando proceso de reinicio de TECNO-BOT",
            "□□□□□ 0%",
            "■□□□□ 20%",
            "■■□□□ 40%",
            "■■■□□ 60%",
            "■■■■□ 80%",
            "■■■■■ 100%",
        ];

        // Enviar el mensaje inicial
        const { key } = await conn.sendMessage(m.chat, { text: progreso[0] }, { quoted: m });

        // Editar el mensaje progresivamente
        for (let i = 1; i < progreso.length; i++) {
            await delay(1000); // Espera 1 segundo entre cada actualización
            await conn.sendMessage(m.chat, { text: progreso[i], edit: key });
        }

        // Mensaje final
        await conn.sendMessage(m.chat, { text: "*『✅』*Tecno-Bot* reiniciado con éxito espera unos segundos asta que el proceso termine.*", edit: key });

        // Reinicio del servidor
        await delay(2000); // Espera 2 segundos antes de reiniciar
        process.send('reset'); // Comando para reiniciar
    } else {
        throw 'No tienes permisos para ejecutar este comando.';
    }
};

// Configuración del comando
handler.help = ['xd'];
handler.tags = ['tools'];
handler.command = ['xd']; // El comando será ".XD"
handler.rowner = true;

export default handler;

// Función de espera
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));