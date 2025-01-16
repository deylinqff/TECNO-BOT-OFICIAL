// Código creado por Deyin

const { default: makeWASocket, MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');

// Crear conexión al bot
const startBot = () => {
    const conn = makeWASocket();

    conn.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.message) return;

        const sender = message.key.remoteJid;
        const content = message.message.conversation || message.message.extendedTextMessage?.text;

        // Si el mensaje es "!menu"
        if (content === '!menu') {
            const images = [
                { path: './image1.jpg', caption: 'ℹ️ Información básica del bot.' },
                { path: './image2.jpg', caption: '⚙️ Comandos destacados.' },
                { path: './image3.jpg', caption: '📞 Contacto y soporte.' },
            ];

            for (const img of images) {
                const buffer = fs.readFileSync(img.path);
                await conn.sendMessage(sender, { image: buffer, caption: img.caption });
            }

            await conn.sendMessage(
                sender,
                { text: `*𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻 ©®*\n\n🔹 *Comandos disponibles:*\n1️⃣ !menu - Muestra este menú.\n2️⃣ !info - Información del bot.\n3️⃣ !ayuda - Solicitar soporte.\n4️⃣ !contacto - Hablar con el administrador.\n\n*📥 Actívalo usando cualquier comando.*` },
                { quoted: message }
            );
        }

        // Otros comandos
        if (content === '!info') {
            await conn.sendMessage(sender, { text: 'ℹ️ Este es un bot de prueba creado por Deyin.' });
        }
    });
};

startBot();