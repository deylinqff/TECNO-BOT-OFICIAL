const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");

// Inicializa el cliente de WhatsApp
const client = new Client();

client.on("qr", (qr) => {
    // Muestra el código QR en la terminal para escanear con WhatsApp
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("✅ Bot conectado y listo para usar.");
});

client.on("message", async (message) => {
    if (message.body === ".XD") {
        const progreso = ["□□□□□ 0%", "■□□□□ 20%", "■■□□□ 40%", "■■■□□ 60%", "■■■■□ 80%", "■■■■■ 100%"];
        let index = 0;

        // Envía el mensaje inicial
        const mensaje = await message.reply(progreso[index]);

        // Edita el mensaje cada 1 segundo
        const intervalo = setInterval(() => {
            index++;
            if (index < progreso.length) {
                client.sendMessage(message.from, progreso[index], { quotedMessageId: mensaje.id._serialized });
            } else {
                clearInterval(intervalo);
            }
        }, 1000);
    }
});

// Inicia el cliente
client.initialize();