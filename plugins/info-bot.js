import { promises as fs } from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
    try {
        // Ruta de la imagen (cambia por tu ruta real)
        const imagePath = path.join(__dirname, 'ruta/a/tu/imagen.jpg');

        // Verifica si la imagen existe
        try {
            await fs.access(imagePath);
        } catch {
            throw new Error('No se encontró la imagen en la ruta especificada.');
        }

        // Mensaje informativo del bot con bordes
        const infoBot = `
╔════════════════════════════╗
║      🤖 *TECNO-BOT* 🤖       ║
╠════════════════════════════╣
║ 📌 *Información del Bot:*   ║
║ • **Nombre:** TECNO-BOT     ║
║ • **Creador:** Deyin        ║
║ • **Versión:** Beta 2.0     ║
╠════════════════════════════╣
║ 🔹 *Características:*        ║
║ • Comandos útiles y rápidos ║
║ • Funciona en grupos/privado║
║ • Soporte y mejoras contínuas║
╠════════════════════════════╣
║ 📢 *Nota:*                  ║
║ Este bot está en Beta. Si   ║
║ encuentras errores, avísanos║
╚════════════════════════════╝

¡Gracias por usar *TECNO-BOT*!
`.trim();

        // Enviar la imagen junto con el mensaje
        await conn.sendMessage(
            m.chat,
            {
                image: { url: imagePath },
                caption: infoBot,
            },
            { quoted: m }
        );
    } catch (err) {
        console.error('Error en el comando:', err.message);

        // Respuesta en caso de error
        await conn.reply(
            m.chat,
            `
⚠️ *Error:*  
Ocurrió un problema al procesar tu solicitud.  

🔍 *Detalles:* ${err.message}  
Por favor, revisa la configuración e intenta de nuevo.
`.trim(),
            m
        );
    }
};

// Configuración del comando
handler.help = ['infobot'];
handler.tags = ['info'];
handler.command = /^(infobot)$/i;

handler.register = true;

export default handler;