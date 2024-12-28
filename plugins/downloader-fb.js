if (message.startsWith('.fb ')) {
    const url = message.split(' ')[1];

    if (!url) {
        await sendMessage(chatId, '⚠️ Por favor, proporciona una URL válida después del comando.');
        return;
    }

    await sendMessage(chatId, '⏳ Procesando tu solicitud, espera un momento...');

    try {
        // Usar una API externa para descargar videos de Facebook
        const apiResponse = await axios.get(`https://api.example.com/fb?url=${encodeURIComponent(url)}`);
        const videoUrl = apiResponse.data.videoUrl;

        if (videoUrl) {
            const videoBuffer = await axios.get(videoUrl, { responseType: 'arraybuffer' });

            // Enviar el video al usuario
            await sendMessage(chatId, {
                video: Buffer.from(videoBuffer.data),
                caption: '✅ Aquí está tu video descargado de Facebook.',
            });
        } else {
            await sendMessage(chatId, '⚠️ No se pudo obtener el video. Verifica la URL o intenta más tarde.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        await sendMessage(chatId, '❌ Ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
    }
}