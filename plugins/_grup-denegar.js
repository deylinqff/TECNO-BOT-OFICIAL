from pyrogram import Client, filters
import re

# Configuración del bot
API_ID = "YOUR_API_ID"  # Reemplaza con tu API_ID de Telegram
API_HASH = "YOUR_API_HASH"  # Reemplaza con tu API_HASH de Telegram
BOT_TOKEN = "YOUR_BOT_TOKEN"  # Token del bot de Telegram

app = Client("whatsapp-bot", api_id=API_ID, api_hash=API_HASH, bot_token=BOT_TOKEN)

# Expresión regular para detectar enlaces de grupos
group_link_pattern = re.compile(r"https://chat\.whatsapp\.com/\S+")

@app.on_message(filters.private & filters.text)
def detect_group_link(client, message):
    # Verifica si el mensaje contiene un enlace de grupo
    if group_link_pattern.search(message.text):
        message.reply_text("Lo siento, su solicitud no fue aprobada.")
        print(f"Enlace detectado y rechazado de: {message.from_user.first_name}")

# Ejecutar el bot
if __name__ == "__main__":
    print("El bot está corriendo...")
    app.run()