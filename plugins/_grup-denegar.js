from flask import Flask, request
import re
import requests

app = Flask(__name__)

# Configura tus credenciales de WhatsApp API
ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"  # Reemplaza con tu token de acceso
PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID"  # Reemplaza con tu número de teléfono ID

# Expresión regular para detectar enlaces de grupos
group_link_pattern = re.compile(r"https://chat\.whatsapp\.com/\S+")

# Función para enviar mensajes
def send_message(phone_number, message):
    url = f"https://graph.facebook.com/v17.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    data = {
        "messaging_product": "whatsapp",
        "to": phone_number,
        "type": "text",
        "text": {"body": message},
    }
    response = requests.post(url, headers=headers, json=data)
    return response.status_code

# Ruta para manejar los mensajes entrantes
@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json

    # Procesar solo mensajes entrantes
    if "messages" in data["entry"][0]["changes"][0]["value"]:
        message = data["entry"][0]["changes"][0]["value"]["messages"][0]
        phone_number = message["from"]
        text = message.get("text", {}).get("body", "")

        # Detectar enlace de grupo
        if group_link_pattern.search(text):
            send_message(phone_number, "Lo siento, su solicitud no fue aprobada.")

    return "OK", 200

if __name__ == "__main__":
    app.run(port=5000)