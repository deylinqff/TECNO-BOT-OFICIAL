let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `✳️ ${mssg.noLink('TikTok')}\n\n 📌 ${mssg.example} : ${usedPrefix + command} https://vm.tiktok.com/ZMreHF2dC/`;

if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `❎ ${mssg.noLink('TikTok')}`;
await m.react(rwait)

let data = await fg.tiktok(`${args[0]}`);
let { title, play, duration } = data.result;
let { nickname } = data.result.author;

conn.sendFile(m.chat, `${play}`, `tiktok.mp4`, `*⛄ ${nickname}:  ${title}*\n *• ${duration}*`, m);
m.react(done)
}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i
export default handler