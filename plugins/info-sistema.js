const { Client, LocalAuth } = require('whatsapp-web.js');
const os = require('os');
const { execSync } = require('child_process');

// Inicializar el cliente
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('ready', () => {
    console.log('El bot está listo y conectado a WhatsApp!');
});

// Escuchar mensajes
client.on('message', (message) => {
    if (message.body.toLowerCase() === 'comandob.sistema') {
        // Obtener información del sistema
        const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2); // Memoria total en GB
        const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2); // Memoria libre en GB
        const usedMem = (totalMem - freeMem).toFixed(2); // Memoria usada en GB

        // Obtener espacio en disco (Linux/Unix/Windows)
        let diskInfo = 'Espacio en disco no disponible';
        try {
            const diskUsage = execSync('df -h --total | grep total').toString();
            const diskData = diskUsage.split(/\s+/);
            const totalDisk = diskData[1];
            const usedDisk = diskData[2];
            const availableDisk = diskData[3];
            diskInfo = `Disco Total: ${totalDisk}, Usado: ${usedDisk}, Disponible: ${availableDisk}`;
        } catch (error) {
            diskInfo = 'No se pudo obtener el espacio en disco.';
        }

        // Construir respuesta
        const sistemaInfo = `
📊 *Información del Sistema* 📊
- 💾 *Memoria Total*: ${totalMem} GB
- 🗂️ *Memoria Usada*: ${usedMem} GB
- 📂 *Memoria Libre*: ${freeMem} GB
- 💿 *Almacenamiento*: ${diskInfo}

🛠️ *Servidor Activo*: Sí
🕒 *Tiempo de Actividad*: ${(os.uptime() / 3600).toFixed(2)} horas
        `;
        message.reply(sistemaInfo);
    }
});

// Iniciar el cliente
client.initialize();