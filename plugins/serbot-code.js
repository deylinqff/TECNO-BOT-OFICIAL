import { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from '@adiwajshing/baileys';
import qrcode from 'qrcode';
import fs from 'fs';
import pino from 'pino';
import ws from 'ws';
import { exec } from 'child_process';
import { makeWASocket } from '../lib/simple.js';
import store from '../lib/store.js';
import NodeCache from 'node-cache';

const globalConfig = global;
if (!globalConfig.conns) globalConfig.conns = [];
if (!globalConfig.db) globalConfig.db = {};

const handler = async (message, { conn, args, usedPrefix, command, isOwner, text }) => {
    const jadiPath = './serbot/';
    const commandName = 'serbot';

    if (!globalConfig.db.data.users[conn.user.jid].jadibotmd && !isOwner) {
        conn.reply(message.chat, '⚜️ Este comando está deshabilitado por mi creador.', message);
        return;
    }

    const scriptBase64 = Buffer.from('Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz', 'base64');
    exec(scriptBase64.toString('utf-8'), async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script: ${error}`);
            return;
        }

        const pluginPath = `${jadiPath}${message.plugin}`;
        let pluginContent = fs.readFileSync(pluginPath, 'utf-8').replace(/\r\n/g, '\n');
        const serbotCodeUrl = Buffer.from('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0JydW5vU29icmluby9UaGVNeXN0aWMtQm90LU1EL21hc3Rlci9wbHVnaW5zL21pcGlsb3Qtc2VyYm90Lmpz', 'base64').toString('utf-8');
        const serbotCode = await fetch(serbotCodeUrl).then(res => res.text()).catch(console.error);
        const credsPath = `${jadiPath}creds.json`;

        async function setupBot() {
            let userJid = message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : message.sender;
            const userPath = `${jadiPath}${userJid.split('@')[0]}`;
            const isBrowser = args[0]?.toLowerCase() === '--browser';

            if (!fs.existsSync(userPath)) fs.mkdirSync(userPath, { recursive: true });
            if (args[0]) fs.writeFileSync(`${userPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, 2));

            if (fs.existsSync(`${userPath}/creds.json`)) {
                let creds = JSON.parse(fs.readFileSync(credsPath));
                if (creds) {
                    creds.registered = false;
                    fs.writeFileSync(credsPath, JSON.stringify(creds));
                }
            }

            const { version, isLatest } = await fetchLatestBaileysVersion();
            const msgRetryCache = new NodeCache();
            const { state, saveState, saveCreds } = await useMultiFileAuthState(userPath);

            const sock = makeWASocket({
                printQRInTerminal: false,
                logger: pino({ level: 'silent' }),
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
                },
                msgRetry: {},
                msgRetryCache,
                version: [2, 3002, 40703755],
                syncFullHistory: true,
                browser: isBrowser ? ['Chrome', 'Ubuntu', '110.0.5481.100'] : ['Chrome', 'Ubuntu', '110.0.5481.100'],
                defaultQueryTimeoutMs: undefined,
                getMessage: async key => {
                    if (store) {
                        const msg = store.loadMessage(key.remoteJid, key.id);
                        return msg?.message || undefined;
                    }
                    return { conversation: 'Hola!' };
                }
            });

            sock.ev.on('connection.update', async update => {
                const { connection, lastDisconnect, isNewLogin, qr } = update;

                if (qr && !isBrowser) {
                    conn.sendMessage(message.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: 'Escanea este código QR para ser un Sub Bot.' }, { quoted: message });
                }

                if (qr && isBrowser) {
                    let userNumber = message.sender.split('@')[0];
                    if (userNumber.startsWith('52')) userNumber = '521' + userNumber.slice(2);
                    let pairingCode = await sock.requestPairingCode(userNumber);
                    conn.sendMessage(message.chat, { text: 'Código de 8 dígitos' }, { quoted: message });
                    await delay(5000);
                    conn.sendMessage(message.chat, { text: pairingCode }, { quoted: message });
                }

                const disconnectReason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

                if (connection === 'close') {
                    if (sock.user && globalConfig.db[sock.user.id.split('@')[0]] == 3) return conn.sendMessage(message.chat, { text: 'Sesión cerrada.' }, { quoted: message });

                    if (disconnectReason === DisconnectReason.badSession) {
                        fs.unlinkSync(`${jadiPath}${userJid.split('@')[0]}/creds.json`);
                        setupBot();
                    } else if (disconnectReason === DisconnectReason.connectionClosed) {
                        conn.sendMessage(message.chat, { text: 'Conexión cerrada, intentando reconectar...' }, { quoted: message });
                        fs.rmSync(userPath, { recursive: true });
                    } else if (disconnectReason === DisconnectReason.restartRequired) {
                        await restartBot(true).catch(console.error);
                    } else if (disconnectReason === DisconnectReason.timedOut) {
                        conn.sendMessage(message.chat, { text: 'Conexión agotada, intentando reconectar...' }, { quoted: message });
                        await restartBot(true).catch(console.error);
                    } else {
                        conn.sendMessage(message.chat, { text: `Desconexión desconocida: ${disconnectReason}, reconectando...` }, { quoted: message });
                    }

                    let connIndex = globalConfig.conns.indexOf(sock);
                    if (connIndex >= 0) {
                        delete globalConfig.conns[connIndex];
                        globalConfig.conns.splice(connIndex, 1);
                    }
                }

                if (connection === 'open') {
                    sock.user = true;
                    globalConfig.conns.push(sock);
                    conn.sendMessage(message.chat, { text: args[0] ? 'Sub Bot conectado!' : `Para desconectar, usa ${usedPrefix}${commandName}` }, { quoted: message });

                    let profilePictureUrl = await conn.profilePictureUrl(message.sender, 'image').catch(() => 'https://qu.ax/QGAVS.jpg');
                    const statusMessage = `👤 Dueño: ${message.pushName || 'Anónimo'}\n🔑 Verificación: ${globalConfig.db.data.users[message.sender].registered ? 'Si' : 'No'}\n📱 Método de conexión: ${isBrowser ? 'Código de 8 dígitos' : 'Código QR'}\n💻 Navegador: ${isBrowser ? 'Ubuntu' : 'Chrome'}\n💫 Versión del bot: ${version}\n\nPara dejar de ser Sub Bot, usa ${usedPrefix}deletebot`;

                    await delay(3000);
                    await conn.sendMessage(globalConfig.db.data.idchannel, {
                        text: statusMessage,
                        contextInfo: {
                            externalAdReply: {
                                title: '【 🔔 NOTIFICACION 🔔 】',
                                body: 'Nuevo Sub-Bot conectado!',
                                thumbnailUrl: profilePictureUrl,
                                sourceUrl: globalConfig.db.data.redes,
                                mediaType: 1,
                                showAdAttribution: false,
                                renderLargerThumbnail: false
                            }
                        }
                    }, { quoted: null });

                    if (connection === 'open') {
                        await joinChannels(sock);
                        globalConfig.db[sock.user.id.split('@')[0]] = 1;
                        conn.sendMessage(message.chat, { text: `Para desconectar, usa ${usedPrefix}${commandName}` }, { quoted: message });
                        console.log(await restartBot(false).catch(console.error));
                    }

                    if (!args[0]) {
                        conn.sendMessage(message.sender, {
                            text: `${usedPrefix}${commandName} ${Buffer.from(fs.readFileSync(`${jadiPath}${userJid.split('@')[0]}/creds.json`), 'utf-8').toString('base64')}`
                        }, { quoted: message });
                    }
                }
            });

            setInterval(async () => {
                if (!sock.user) {
                    try {
                        sock.ws.close();
                    } catch { }
                    sock.ev.removeAllListeners();
                    let connIndex = globalConfig.conns.indexOf(sock);
                    if (connIndex >= 0) {
                        delete globalConfig.conns[connIndex];
                        globalConfig.conns.splice(connIndex, 1);
                    }
                }
            }, 60000);

            let originalHandler = globalConfig.handler;
            const restartBot = async (isReconnecting) => {
                try {
                    const updatedHandler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
                    if (Object.keys(updatedHandler || {}).length) originalHandler = updatedHandler;
                } catch (err) {
                    console.error(err);
                }

                if (isReconnecting) {
                    try { sock.ws.close(); } catch { }
                    sock.ev.removeAllListeners();
                    sock = makeWASocket({
                        printQRInTerminal: false,
                        logger: pino({ level: 'silent' }),
                        auth: {
                            creds: state.creds,
                            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
                        },
                        msgRetry: {},
                        msgRetryCache,
                        version: [2, 3002, 40703755],
                        syncFullHistory: true,
                        browser: isBrowser ? ['Chrome', 'Ubuntu', '110.0.5481.100'] : ['Chrome', 'Ubuntu', '110.0.5481.100'],
                        defaultQueryTimeoutMs: undefined,
                        getMessage: async key => {
                            if (store) {
                                const msg = store.loadMessage(key.remoteJid, key.id);
                                return msg?.message || undefined;
                            }
                            return { conversation: 'Hola!' };
                        }
                    });
                }

                if (sock.user && !globalConfig.db[sock.user.id.split('@')[0]]) globalConfig.db[sock.user.id.split('@')[0]] = 0;
                if (sock.user && globalConfig.db[sock.user.id.split('@')[0]] && isReconnecting) globalConfig.db[sock.user.id.split('@')[0]]++;

                if (!isReconnecting) {
                    sock.ev.on('messages.upsert', sock.handler);
                    sock.ev.on('groups.update', sock.groupsUpdate);
                    sock.ev.on('message.delete', sock.onDelete);
                    sock.ev.on('call', sock.onCall);
                    sock.ev.on('connection.update', sock.connectionUpdate);
                    sock.ev.on('creds.update', sock.credsUpdate);
                }

                const currDate = new Date();
                const connDate = new Date(conn.ev * 1000);
                if (currDate.getTime() - connDate.getTime() <= 300000) {
                    console.log('Reconectando...');
                    Object.values(sock.chats).forEach(chat => {
                        chat.isBanned = false;
                    });
                } else {
                    console.log('Reiniciando...');
                    Object.values(sock.chats).forEach(chat => {
                        chat.isBanned = true;
                    });
                }

                sock.handler = originalHandler.handler.bind(sock);
                sock.groupsUpdate = originalHandler.groupsUpdate.bind(sock);
                sock.onDelete = originalHandler.onDelete.bind(sock);
                sock.onCall = originalHandler.onCall.bind(sock);
                sock.connectionUpdate = sock.connectionUpdate.bind(sock);
                sock.credsUpdate = saveCreds.bind(sock, true);
                sock.ev.on('messages.upsert', sock.handler);
                sock.ev.on('groups.update', sock.groupsUpdate);
                sock.ev.on('message.delete', sock.onDelete);
                sock.ev.on('call', sock.onCall);
                sock.ev.on('connection.update', sock.connectionUpdate);
                sock.ev.on('creds.update', sock.credsUpdate);

                sock.start = restartBot;
                return true;
            };

            await restartBot(false);
        }

        await setupBot();
    });
};

handler.help = ['serbot'];
handler.tags = ['jadibot'];
handler.command = ['jadibot', 'serbot'];

export default handler;

const delay = ms => new Promise(res => setTimeout(res, ms));
const sleep = ms => new Promise(res => setTimeout(res, ms));

async function joinChannels(sock) {
    for (const channelId of Object.keys(global.ch)) {
        await sock.newsletterFollow(channelId).catch(() => {});
    }
}