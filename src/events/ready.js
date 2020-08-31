const { Client } = require('discord.js')

module.exports = class ReadyEvent {
    constructor(client) {
        this.client = client
    }
    async run() {
        console.log(`Bot iniciado. ${this.client.users.cache.size} usuários. ${this.client.guilds.cache.size} servidores.`)
    }
}