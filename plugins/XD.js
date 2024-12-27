// Detecta si se escribe ".XD" en el chat y edita el mensaje con una animación de progreso.
function enviarProgreso() {
    const textarea = document.querySelector("div[contenteditable='true']");
    if (!textarea) {
        console.error("No se encontró el área de texto. Asegúrate de estar en un chat de WhatsApp.");
        return;
    }

    // Escribe el mensaje inicial.
    textarea.innerHTML = ".XD";
    textarea.dispatchEvent(new InputEvent('input', { bubbles: true }));

    // Simula presionar la tecla Enter para enviar el mensaje.
    setTimeout(() => {
        const sendButton = document.querySelector("span[data-icon='send']");
        if (sendButton) sendButton.click();
    }, 500);

    // Define los estados del progreso.
    const progreso = ["□□□□□ 0%", "■□□□□ 20%", "■■□□□ 40%", "■■■□□ 60%", "■■■■□ 80%", "■■■■■ 100%"];
    let index = 0;

    // Edita el mensaje enviado.
    const editarMensaje = setInterval(() => {
        const mensajes = document.querySelectorAll(".message-out");
        if (mensajes.length > 0) {
            const ultimoMensaje = mensajes[mensajes.length - 1];
            const textoMensaje = ultimoMensaje.querySelector("span.selectable-text");

            if (textoMensaje) {
                textoMensaje.textContent = progreso[index];
                index++;
                if (index === progreso.length) clearInterval(editarMensaje); // Detiene la edición al llegar al 100%.
            }
        }
    }, 1000);
}

// Ejecuta la función.
enviarProgreso();