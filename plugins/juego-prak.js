import random
from time import sleep

# Respuestas Punk
punk_responses = [
    "¿En serio? ¿Eso quieres saber? ¡Tienes mucho que aprender!",
    "¿Tú también te atreves a hablar conmigo? ¡Tienes agallas!",
    "¿Me estás pidiendo una respuesta, o solo estás perdido en este abismo?",
    "¡Eres tan curioso como una guitarra rota, pero te respeto!",
    "¿Sabías que no soy solo un bot, soy una máquina rebelde? ¡Desafíame!"
]

# Respuestas AI Punk Coder (Genera código funky)
def punk_coder():
    code_snippets = [
        "print('¡Aguanta, esto es código punk!')",
        "while True: \n    print('Punk hasta la muerte')",
        "def punk_function(): \n    return 'Código rebelde en acción!'",
        "import random \n    random.choice(['¡Resiste!', '¡No te detengas!'])"
    ]
    return random.choice(code_snippets)

# Función para generar un reto punk
def punk_challenge():
    challenges = [
        "Desafío Punk: ¿Cuántas veces puedes decir 'Revolución' en 10 segundos?",
        "¡Reto aceptado! Encuentra un chiste tan rebelde como este bot.",
        "¿Listo para un reto? Haz un dibujo con solo líneas rectas. ¡Sin reglas!"
    ]
    return random.choice(challenges)

# Función para responder aleatoriamente o con un reto punk
def punk_response():
    action = random.choice([random.choice(punk_responses), punk_challenge(), punk_coder()])
    return action

# Función para escuchar el mensaje del usuario
def listen_for_messages(contact):
    print(f"Escuchando mensaje de {contact}...")
    incoming_message = input(f"Escribe el mensaje de {contact}: ").lower()

    # Lógica de comandos y respuestas
    if "hola" in incoming_message or "hey" in incoming_message:
        return "¡Hola, ser de la oscuridad! ¿Qué quieres de este bot punk?"
    elif "jugar" in incoming_message or "reto" in incoming_message:
        return punk_challenge()
    elif "código" in incoming_message:
        return punk_coder()
    else:
        return punk_response()

# Función principal que gestiona la interacción
def start_punk_bot(contact):
    print(f"El bot {contact} está listo para interactuar en modo Punk 🤘")
    while True:
        message = listen_for_messages(contact)
        print(f"Bot responde a {contact}: {message}")
        sleep(2)  # Pausa antes de continuar escuchando

# Activar el bot con el contacto (es un ejemplo, debes integrarlo con la API real de WhatsApp)
contact = "Número_de_usuario"  # Aquí colocas el número del contacto.
start_punk_bot(contact)