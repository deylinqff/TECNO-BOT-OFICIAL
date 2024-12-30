Const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { existsSync, mkdirSync } = require('fs');

// Crear carpeta para el almacenamiento si no existe
if (!existsSync('./auth')) mkdirSync('./auth');

// Autenticación
const { state, saveState } = useSingleFileAuthState('./auth/session.json');

// Iniciar el cliente de WhatsApp
const startBot = () => {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    let autoLectorActivado = false;

    // Evento: Mensaje recibido
    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.message) return;

        const from = message.key.remoteJid; // ID del remitente
        const body = message.message.conversation || message.message.extendedTextMessage?.text || '';

        // Comando para activar/desactivar el autolector
        if (body === '.lector') {
            autoLectorActivado = !autoLectorActivado;
            await sock.sendMessage(from, {
                text: `Auto lector ${autoLectorActivado ? 'activado' : 'desactivado'}.`,
            });
            return;
        }

        // Marcar mensajes dirigidos al bot como leídos si la función está activada
        if (autoLectorActivado && message.key.fromMe) {
            await sock.readMessages([message.key]);
            console.log('Mensaje marcado como leído:', body);
        }
    });

    // Manejar desconexión
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada, reconectando...', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('¡Conexión exitosa!');
        }
    });

    sock.ev.on('creds.update', saveState);
};

// Iniciar el bot
startBot();
