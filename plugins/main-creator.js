let handler = async (m, { conn, usedPrefix, isOwner }) => {  
    let txt_owner = `  
⚡ *𝗖𝗢𝗡𝗘𝗫𝗜Ó𝗡 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟* ⚡  

✨ *¡Bienvenido a la Red!* ✨  

🚀 *¿Problemas con el Bot?*  
Aquí tienes el contacto de mi *𝗖𝗥𝗘𝗔𝗗𝗢𝗥*.  

💡 *¿Quieres agregar el Bot a tu grupo?*  
Escríbele y lo solucionará de inmediato.  

🌌 *𝗖𝗥𝗘𝗔𝗗𝗢𝗥*:  
📞 *Deylin*:  
🌐 [ 𝗪𝗮.𝗺𝗲/𝟱𝟬𝟰𝟴𝟴𝟭𝟵𝟴𝟱𝟳𝟯 ]  
`;  

    await conn.sendFile(  
        m.chat,  
        "https://files.catbox.moe/uwxegp.jpg",  
        'thumbnail.jpg',  
        txt_owner,  
        m  
    );  
};  

handler.help = ['owner'];  
handler.tags = ['main'];  
handler.command = ['owner', 'creator', 'creador', 'dueño'];  

export default handler;