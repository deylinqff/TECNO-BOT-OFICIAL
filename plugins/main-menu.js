const { MessageType } = require('@adiwajshing/baileys');

// Función principal del bot
conn.on('chat-update', async (chat) => {
    try {
        if (!chat.hasNewMessage) return;
        const m = chat.messages.all()[0];
        if (!m.message) return;

        const sender = m.key.remoteJid;
        const message = m.message.conversation || m.message.extendedTextMessage?.text;

        // Comando .menu
        if (message === '.menu') {
            const menuText = `
            🌟 *Menú Principal* 🌟

            📋 *Opciones disponibles*:
            1️⃣ Opción 1 - Descripción aquí
            2️⃣ Opción 2 - Descripción aquí
            3️⃣ Opción 3 - Descripción aquí

            Usa el comando correspondiente para más detalles.
            `;

            // URLs de las imágenes
            const imageUrls = [
                'https://url-de-imagen1.com/imagen.jpg', // Cambia por tus URLs
                'https://url-de-imagen2.com/imagen.jpg',
                'https://url-de-imagen3.com/imagen.jpg'
            ];

            // Elegir una imagen al azar
            const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            // Enviar el mensaje con la imagen
            const buffer = await fetch(randomImage).then(res => res.buffer()); // Descargar la imagen
            await conn.sendMessage(
                sender,
                { image: buffer, caption: menuText },
                MessageType.image
            );
        }
    } catch (err) {
        console.error('Error procesando mensaje:', err);
    }
});