import { promises as fs } from 'fs';
import path from 'path';

var handler = async (m, { conn }) => {
    try {
        // Mensaje de información del bot
        let infoBot = `
🤖 *TECNO-BOT: Tu Asistente Virtual* 🤖

📌 *Información General:*
• **Nombre:** TECNO-BOT  
• **Creador:** Deyin  
• **Versión:** Beta  

📢 *Nota Importante:*  
Este bot está en su versión Beta, por lo que podría presentar errores en grupos o con ciertos comandos. Estamos trabajando continuamente para mejorar tu experiencia.

Gracias por confiar en TECNO-BOT. ¡Estoy aquí para ayudarte en lo que necesites!
`.trim();

        // Enviar el mensaje de información
        await conn.reply(m.chat, infoBot, m);
    } catch (err) {
        console.error('Error al procesar el comando:', err);
        await conn.reply(m.chat, '⚠️ Hubo un inconveniente al procesar tu solicitud. Por favor, intenta nuevamente más tarde.', m);
    }
};

// Configuración del comando
handler.help = ['infobot'];
handler.tags = ['info'];
handler.command = /^(infobot)$/i;

handler.register = true;

export default handler;