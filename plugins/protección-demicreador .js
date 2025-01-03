const { default: makeWASocket, proto, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

async function startBot() {
    const sock = makeWASocket();

    sock.ev.on('messages.upsert', async (message) => {
        const msg = message.messages[0];
        if (!msg.key.participant || !msg.key.remoteJid.includes('@g.us')) return;

        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
        const isAdmin = groupMetadata.participants.some(
            (p) => p.id === sock.user.id && p.admin
        );

        if (msg.messageStubType === proto.WebMessageInfo.WEB_MESSAGE_STUB_TYPE.REMOVE) {
            const removedUser = msg.messageStubParameters[0];
            const creatorNumber = '50488198573@s.whatsapp.net';

            if (removedUser === creatorNumber) {
                if (isAdmin) {
                    // Mensaje de advertencia
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: '🚀 No puedes eliminar a mi creador si está en este grupo.',
                    });

                    // Intentar agregar al creador nuevamente
                    try {
                        await sock.groupParticipantsUpdate(
                            msg.key.remoteJid,
                            [creatorNumber],
                            'add'
                        );
                    } catch (error) {
                        console.error('Error al agregar al creador:', error);
                    }
                } else {
                    // Mensaje y salida del grupo
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: '🚀 Eliminaste a mi creador, lo cual me obliga a salirme del grupo ya que no soy admin.',
                    });

                    // Salir del grupo
                    await sock.groupLeave(msg.key.remoteJid);
                }
            }
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.error('El bot fue desconectado.');
            } else {
                console.error('Reconectando...');
                startBot();
            }
        }
    });
}

startBot();