// Je hoofdbestand (bijv. bot.js)
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { getFact, getImage } = require('./firebase'); // Importeer de getFact functie

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
client.on('interactionCreate',async (interaction) =>{
    if (!interaction.isChatInputCommand()) return;
if (interaction.commandName === 'hallo'){
    interaction.reply(`Hello ${interaction.user.username}, I am currently smoking!`)
}
if (interaction.commandName === 'sigcalc'){
    const pakje = interaction.options.getInteger('pakje');
    const sigaretten = pakje * 20;
    interaction.reply(`In ${pakje} marlboro pakjes zitten ${sigaretten} sigaretten.`);
}
if (interaction.commandName === 'image'){
    try {
        const randomImage = await getImage();
        if (typeof randomImage === 'string') {
            interaction.reply({
                content: "Hier is een image of a master smoker:",
                files: [randomImage]
            });
        } else {
            throw new Error("Ongeldig beeldformaat ontvangen.");
        }
    } catch (error) {
        console.error("Error bij het ophalen van image:", error);
        interaction.reply("Er is een fout opgetreden bij het ophalen van een image.");
    }
}

if (interaction.commandName === 'feit'){
    try {
        const randomFact = await getFact(); 
        interaction.reply(randomFact);
    } catch (error) {
        console.error("Error bij het ophalen van feit:", error);
        interaction.reply("Er is een fout opgetreden bij het ophalen van een feit.");
    }
}
})
client.login(process.env.CLIENT_TOKEN);

