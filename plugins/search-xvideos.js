async function xnxxdl(URL) {
    try {
        const response = await axios.get(URL);  // Solicitud HTTP GET
        const html = response.data;  // Obtener el contenido HTML de la página
        const $ = cheerio.load(html);  // Cargar el HTML en cheerio para analizarlo

        // Extraer detalles del video como título y duración
        const title = $('meta[property="og:title"]').attr("content");
        const duration = $('meta[property="og:duration"]').attr("content");
        
        // Extraer el script que contiene las URLs de los videos
        const videoScript = $("#video-player-bg > script:nth-child(6)").html();

        // Obtener las URLs del video en diferentes calidades y la miniatura
        const files = {
            low: (videoScript.match(/html5player.setVideoUrlLow\('([^']*)'\);/) || [])[1],
            high: (videoScript.match(/html5player.setVideoUrlHigh\('([^']*)'\);/) || [])[1],
            HLS: (videoScript.match(/html5player.setVideoHLS\('([^']*)'\);/) || [])[1],
            thumb: (videoScript.match(/html5player.setThumbUrl\('([^']*)'\);/) || [])[1],
        };

        // Devolver el resultado con éxito
        return { status: 200, result: { title, URL, duration, files } };
    } catch (error) {
        // Devolver el error en caso de que ocurra
        return { code: 503, status: false, result: error.message };
    }
}

// Función para buscar videos por nombre
async function xnxxSearch(query) {
    const searchUrl = `https://www.xnxx.com/search/${encodeURIComponent(query)}`;
    try {
        const response = await axios.get(searchUrl);  // Solicitud HTTP GET para la búsqueda
        const html = response.data;  // Obtener el contenido HTML de la página de búsqueda
        const $ = cheerio.load(html);  // Cargar el HTML en cheerio

        // Buscar el primer resultado de video
        const firstResult = $("div.mozaique a").attr("href");

        if (firstResult) {
            // Si hay un resultado, construir la URL completa del video
            const videoUrl = `https://www.xnxx.com${firstResult}`;
            return await xnxxdl(videoUrl);  // Llamar a la función xnxxdl para obtener detalles del video
        } else {
            // Si no se encuentra ningún video
            return {
                status: 404,
                result: "No se encontró ningún video con ese nombre.",
            };
        }
    } catch (error) {
        // Manejar el error en caso de fallo
        return { status: 503, result: error.message };
    }
}

handler.help = ['xvideosearch']
handler.tag = ['search']
handler.command = ['xvideosearch', 'xvse'];

export default handler