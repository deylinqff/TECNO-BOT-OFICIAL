// ... (resto de tu código)

client.on('message', async msg => {
  // Verificar si el mensaje comienza con el comando .voz texto
  if (msg.body.startsWith('.voz texto')) {
    // Obtener el texto a partir del comando
    const textToSpeak = msg.body.slice('.voz texto'.length).trim();

    // Generar audio y enviar
    const audioContent = await textToSpeech(textToSpeak);
    client.sendMessage(msg.from, { audio: audioContent, mimetype: 'audio/mpeg' });
  } else {
    // ... (tu lógica para otros comandos o mensajes)
  }
});
