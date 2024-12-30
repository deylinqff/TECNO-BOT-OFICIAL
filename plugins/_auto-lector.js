require('dotenv').config(); // Para manejar variables de entorno
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Inicializa el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Cambia a false si necesitas ver la ventana del navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Opciones para entornos de servidor
    },
});

// Variable para activar/desactivar el autolector
let autolectorActivado = false;

// Genera el QR en la terminal y lo guarda en un archivo (opcional)
client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });

    // Guarda el QR en un archivo para facilitar acceso
    fs.writeFileSync('./qrcode.txt', qr);
});

// Mensaje cuando el cliente esté listo
client.on('ready', () => {
    console.log(`[${new Date().toISOString()}] ¡El bot está listo y conectado!`);
});

// Escucha mensajes entrantes
client.on('message', (message) => {
    // Comandos para activar/desactivar el autolector
    if (message.body.toLowerCase() === '.autolector-on') {
        autolectorActivado = true;
        message.reply('Autolector activado.');
        console.log(`[${new Date().toISOString()}] Autolector activado.`);
    } else if (message.body.toLowerCase() === '.autolector-off') {
        autolectorActivado = false;
        message.reply('Autolector desactivado.');
        console.log(`[${new Date().toISOString()}] Autolector desactivado.`);
    }

    // Funcionalidad del autolector
    if (autolectorActivado) {
        console.log(`[${new Date().toISOString()}] Mensaje de ${message.from}: ${message.body}`);

        // Marca el mensaje como leído
        message.markAsRead().then(() => {
            console.log(`[${new Date().toISOString()}] Mensaje de ${message.from} marcado como leído.`);
        }).catch((err) => {
            console.error('Error al marcar como leído:', err);
        });
    }
});

// Manejo de errores de autenticación
client.on('auth_failure', (msg) => {
    console.error(`[${new Date().toISOString()}] Error de autenticación:`, msg);
});

// Manejo de desconexiones y reconexiones
client.on('disconnected', (reason) => {
    console.error(`[${new Date().toISOString()}] Cliente desconectado:`, reason);
    console.log('Intentando reconectar...');
    client.initialize();
});

// Inicia el cliente
client.initialize();