from pytube import YouTube
import venom
import ffmpeg

async def handle_fb_command(client, message):
    """
    Maneja el comando .fb para descargar videos de Facebook y enviarlos como audio a WhatsApp.

    Args:
        client: El cliente de Venom-bot.
        message: El mensaje recibido.
    """

    try:
        # Extrae la URL de Facebook del mensaje
        url = message.body.split(' ')[1]

        # Descarga el video en formato de audio
        yt = YouTube(url)
        audio_stream = yt.streams.filter(only_audio=True).first()
        output_file = audio_stream.download(filename="temp.mp4")

        # Convierte el video a formato .ogg (compatible con WhatsApp)
        ffmpeg.input(output_file).output("temp.ogg", acodec='libopus').run()

        # Envía el audio como nota de voz
        await client.sendAudio(message.from, "temp.ogg")

        # Elimina los archivos temporales
        import os
        os.remove("temp.mp4")
        os.remove("temp.ogg")

    except Exception as e:
        await client.sendText(message.from, "Hubo un error al procesar tu solicitud. Asegúrate de que la URL sea válida y que el video esté disponible.")
        print(f"Error: {e}")

# Inicializa el bot de WhatsApp
venom.create().then(client => {
    client.onMessage(async message => {
        if message.body.startswith('.fb '):
            await handle_fb_command(client, message)
    })
})
