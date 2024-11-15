require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'hallo',
        description: 'check how the master smoker is doing!',
    },
    {
        name: 'feit',
        description: 'geeft je een feit over roken',
    
    },
    {
name: 'image',
description: 'Geeft je een image van een master smoker',
    },
    {
        name: 'sigcalc',
        description: 'Bereken hoeveel je sigaretten er in een pakje zitten',
        options:[
{
    name: 'pakje',
    description: 'Hoeveel sigaretten zitten er in een pakje marlboro?',
    type : 4,
    required: true,
},

        ],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Registreer commands globaal of per guild
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
                ),
                  { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

