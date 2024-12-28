const { Client, LocalAuth } = require('whatsapp-web.js');

// Inicializar el cliente
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('ready', () => {
    console.log('El bot está listo!');
});

// Escuchar mensajes
client.on('message', (message) => {
    if (message.body.toLowerCase() === '.sistema') {
        const sistemaInfo = `
📢 *Sistema del Bot* 📢
- ✅ *Plataforma*: WhatsApp
- 🤖 *Librería*: whatsapp-web.js
- 🚀 *Versión del Bot*: 1.0.0
- 💻 *Lenguaje*: JavaScript
- ⚙️ *Funcionalidades*:
  1️⃣ Responder mensajes automáticamente.
  2️⃣ Proporcionar comandos específicos.
  3️⃣ Gestionar información del servidor.

💡 *Comandos disponibles*:
- *.Sistema*: Ver detalles del sistema.
- Más comandos estarán disponibles pronto.

🛠️ *Desarrollador*: [Tu Nombre o Alias]
        `;
        message.reply(sistemaInfo);
    }
});

// Iniciar el cliente
client.initialize();