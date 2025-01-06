const { Client, LocalAuth } = require('whatsapp-web.js');
const { TextToSpeech } = require('@google-cloud/text-to-speech');
const { Configuration, OpenAIApi } = require("openai");

// Configuración de WhatsApp Web
const client = new Client({
  authStrategy: new LocalAuth()
});

// Configuración de Google Cloud Text-to-Speech
const clientTTS = new TextToSpeech();

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: "TU_API_KEY_DE_OPENAI",
});
const openai = new OpenAIApi(configuration);

// Función para generar texto con OpenAI
async function generateText(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error al generar texto:", error);
    return "Lo siento, hubo un error al procesar tu solicitud.";
  }
}

// Función para convertir texto a audio
async function textToSpeech(text) {
  try {
    const request = {
      input: { text: text },
      voice: { languageCode: 'es-ES', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await clientTTS.synthesizeSpeech(request);
    return response.audioContent;
  } catch (error) {
    console.error("Error al generar audio:", error);
    return null;
  }
}

// Función para manejar mensajes
client.on('message', async msg => {
  if (msg.body.startsWith('.voz texto')) {
    const textToSpeak = msg.body.slice('.voz texto'.length).trim();
    try {
      const audioContent = await textToSpeech(await generateText(textToSpeak));
      if (audioContent) {
        client.sendMessage(msg.from, { audio: audioContent, mimetype: 'audio/mpeg' });
      } else {
        client.sendMessage(msg.from, "Lo siento, no pude generar el audio.");
      }
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      client.sendMessage(msg.from, "Lo siento, hubo un error. Intenta nuevamente más tarde.");
    }
  } else {
    // ... (tu lógica para otros comandos o mensajes)
  }
});

client.initialize();
