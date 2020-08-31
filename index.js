const Client = require('./src/Client.js');
const { MessageEmbed } = require('discord.js');

const client = new Client({
    fetchAllMembers: true
});

require('dotenv').config();
client.loadCommands('./src/commands');
client.loadEvents('./src/events');

client.login(process.env.TOKEN);