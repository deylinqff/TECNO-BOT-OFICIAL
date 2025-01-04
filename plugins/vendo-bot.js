const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// Autenticación del bot
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

// Inicialización del bot
async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada, reconectando:', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('Bot conectado correctamente');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0];

        // Verifica que sea un mensaje válido
        if (!message.message || message.key.fromMe) return;

        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;

        // Comando .vendo
        if (text === '.vendo') {
            const response = `
*Venta de Bots* 🛠️
1️⃣ 1 bot por *300 diamantes*
2️⃣ 2 bots por *600 diamantes*

📲 Contáctame aquí: https://t.me/tu_usuario
            `;
            await sock.sendMessage(sender, { text: response });
        }
    });

    sock.ev.on('creds.update', saveState);
}

// Inicia el bot
startBot();