const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { unlinkSync } = require('fs');
const qrcode = require('qrcode-terminal');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

const groupLinkRegex = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+/;

async function startBot() {
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async (messageUpdate) => {
        const messages = messageUpdate.messages;
        if (!messages[0].key.fromMe && messages[0].message) {
            const sender = messages[0].key.remoteJid;
            const text = messages[0]?.message?.conversation ||
                         messages[0]?.message?.extendedTextMessage?.text || '';

            if (groupLinkRegex.test(text)) {
                await sock.sendMessage(sender, { text: 'Lo siento, su solicitud no fue aprobada.' });
                console.log(`Enlace de grupo detectado de: ${sender}`);
            }
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode || 0;
            const shouldReconnect = reason !== DisconnectReason.loggedOut;
            console.log(`Conexión cerrada. Razón: ${reason}. Reconectando: ${shouldReconnect}`);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('Bot conectado correctamente.');
        }
    });

    sock.ev.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        console.log('Escanea el código QR para conectar.');
    });
}

startBot();