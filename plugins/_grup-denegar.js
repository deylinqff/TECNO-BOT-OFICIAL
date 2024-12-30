const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

let noxDenegarActivado = false; // Estado de la función

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        console.log("Mensaje recibido:", text); // Depuración

        // Comando para activar la función
        if (text.toLowerCase() === '.nox denegar') {
            noxDenegarActivado = true;
            await sock.sendMessage(from, { text: 'Modo de denegación activado. Enlaces serán bloqueados.' });
        }

        // Comando para desactivar la función
        if (text.toLowerCase() === '.nox permitir') {
            noxDenegarActivado = false;
            await sock.sendMessage(from, { text: 'Modo de denegación desactivado. Enlaces permitidos.' });
        }

        // Verificar si hay un enlace y si la función está activada
        if (noxDenegarActivado && /(https?:\/\/[^\s]+)/gi.test(text)) {
            await sock.sendMessage(from, { text: 'Lo siento, su solicitud no fue aprobada.' });
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada. ¿Reconectar?', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Conexión exitosa');
        }
    });

    sock.ev.on('creds.update', saveState);
}

startBot();