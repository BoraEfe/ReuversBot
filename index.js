// Je hoofdbestand (bijv. bot.js)
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { getFact } = require('./firebase'); // Importeer de getFact functie

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    console.log(msg);

    if (msg.content === '/hallo') {
        msg.reply(`Hello ${msg.author.username} I am currently smoking!`);
    }
    
    if (msg.content === '/feit') {
        try {
            const randomFact = await getFact(); 
            msg.reply(randomFact);
        } catch (error) {
            console.error("Error bij het ophalen van feit:", error);
            msg.reply("Er is een fout opgetreden bij het ophalen van een feit.");
        }
    }
});
