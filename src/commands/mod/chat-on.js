const Command = require('../../structures/command');

module.exports = class chatonCommand extends Command {
    constructor(client) {
        super(client, {
            name: "chat-on",
            aliases: ['chaton', 'inlock', 'destrancar'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Você não tem permissão para executar este comando!")
        const role = message.guild.roles.cache.find(r => r.name === "@everyone")

        message.channel.createOverwrite(role, {
            SEND_MESSAGES: true
        })
        message.reply("canal destrancado com sucesso!")
    }
}