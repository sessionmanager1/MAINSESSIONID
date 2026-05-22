const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, DisconnectReason } = require('@whiskeysockets/baileys')

const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function PEAKY_BLINDER_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Edge"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);

            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    const randomText = generateRandomText();
                    try {
                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let md = "POPKID;;;" + string_session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        let desc = `*👋 POPKID USER\n\n✅ Session Created\n🔐 ID sent (keep safe ⚠️)\n\n📢 https://whatsapp.com/channel/0029Vb70ySJHbFV91PNKuL3T\n💻 https://github.com/popkidmain\n\n❤️‍🩹 By Order`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "popkid ke",
                                    thumbnailUrl: "https://files.catbox.moe/j9ia5c.png",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vb70ySJHbFV91PNKuL3T",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        }, { quoted: code });
                    } catch (e) {
                        let ddd = sock.sendMessage(sock.user.id, { text: e.message || String(e) });
                        let desc = `👋 POPKID USER\n\n✅ Session Created\n🔐 ID sent (keep safe ⚠️)\n\n📢 https://whatsapp.com/channel/0029Vb70ySJHbFV91PNKuL3T\n💻 https://github.com/popkidmain\n\n⭐ By Order`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "popkid ke",
                                    thumbnailUrl: "https://files.catbox.moe/j9ia5c.png",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vb70ySJHbFV91PNKuL3T",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: ddd });
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 𝗰𝗹𝗲𝗮𝗻𝗲𝗱 𝘂𝗽`);
                    // NOTE: process.exit() removed — would kill the Render dyno for all users
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    PEAKY_BLINDER_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    return await PEAKY_BLINDER_MD_PAIR_CODE();
});

module.exports = router;
