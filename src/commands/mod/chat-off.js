const Command = require('../../structures/command');

module.exports = class chatoffCommand extends Command {
    constructor(client) {
        super(client, {
            name: "chat-off",
            aliases: ['chatoff', 'lock', 'trancar'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Você não tem permissão para executar este comando!")
        const role = message.guild.roles.cache.find(r => r.name === "@everyone")

        message.channel.createOverwrite(role, {
            SEND_MESSAGES: false
        })
        message.reply("canal trancado com sucesso!")
    }
}