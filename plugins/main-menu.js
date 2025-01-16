// Código creado por Deyin
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0];
        if (!message.message || message.key.fromMe) return;

        const from = message.key.remoteJid;
        const text = message.message.conversation || '';

        // Menú principal
        if (text.toLowerCase() === 'menu') {
            const menu = `🌟 *Bienvenido a 𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻® ©*  
📱 *Tu asistente digital confiable.*

🔹 *Opciones disponibles:*  
1️⃣ *Información*  
2️⃣ *Soporte técnico*  
3️⃣ *Novedades*  
4️⃣ *Configuraciones*  
5️⃣ *Contacto humano*

*Escribe el número de la opción que deseas.*`;

            await sock.sendMessage(from, { text: menu });
        }

        // Respuesta a las opciones del menú
        if (text === '1') {
            await sock.sendMessage(from, { text: '📝 *Información:* Aquí tienes los detalles sobre nuestros servicios...' });
        } else if (text === '2') {
            await sock.sendMessage(from, { text: '🔧 *Soporte técnico:* Cuéntanos tu problema y te ayudaremos.' });
        } else if (text === '3') {
            await sock.sendMessage(from, { text: '📰 *Novedades:* Estas son las últimas actualizaciones...' });
        } else if (text === '4') {
            await sock.sendMessage(from, { text: '⚙️ *Configuraciones:* Aquí puedes personalizar tu experiencia.' });
        } else if (text === '5') {
            await sock.sendMessage(from, { text: '📞 *Contacto humano:* Un agente estará contigo en breve.' });
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401;
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('✅ Bot conectado exitosamente.');
        }
    });

    sock.ev.on('creds.update', saveState);
}

startBot();