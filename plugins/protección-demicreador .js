const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// Configuración para autenticación
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Guardar la sesión
    sock.ev.on('creds.update', saveState);

    // Escuchar eventos de participantes en el grupo
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;

        console.log(`Evento detectado en grupo: ${id}, Acción: ${action}`);
        const creatorNumber = '50488198573@s.whatsapp.net'; // Cambia al número de tu creador

        // Detectar si el creador fue eliminado
        if (action === 'remove' && participants.includes(creatorNumber)) {
            console.log('El creador ha sido eliminado del grupo.');

            const groupMetadata = await sock.groupMetadata(id);
            const isAdmin = groupMetadata.participants.some(
                (p) => p.id === sock.user.id && p.admin
            );

            if (isAdmin) {
                // Intentar re-agregar al creador
                try {
                    await sock.groupParticipantsUpdate(id, [creatorNumber], 'add');
                    await sock.sendMessage(id, {
                        text: '🚀 No puedes eliminar a mi creador. Lo he vuelto a agregar al grupo.',
                    });
                } catch (error) {
                    console.error('Error al intentar agregar al creador:', error);
                }
            } else {
                // Salir del grupo si no es administrador
                await sock.sendMessage(id, {
                    text: '🚀 Eliminaste a mi creador. Como no soy administrador, me retiro del grupo.',
                });
                await sock.groupLeave(id);
            }
        }
    });

    // Manejar actualizaciones de conexión
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.error('El bot fue desconectado. Escanea el QR nuevamente.');
            } else {
                console.error('Reconectando...');
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Bot conectado correctamente.');
        }
    });
}

startBot();