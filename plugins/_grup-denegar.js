const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { unlinkSync } = require('fs');
const qrcode = require('qrcode-terminal');

// Autenticación
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

// Expresión regular para detectar enlaces de grupos
const groupLinkRegex = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+/;

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async (messageUpdate) => {
        const messages = messageUpdate.messages;
        if (!messages[0].key.fromMe && messages[0].message) {
            const sender = messages[0].key.remoteJid;
            const text = messages[0].message.conversation || '';

            // Si el mensaje contiene un enlace de grupo
            if (groupLinkRegex.test(text)) {
                await sock.sendMessage(sender, {
                    text: 'Lo siento, su solicitud no fue aprobada.',
                });
                console.log(`Enlace de grupo detectado de: ${sender}`);
            }
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada. Reconectando:', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('Bot conectado correctamente.');
        }
    });
}

startBot();