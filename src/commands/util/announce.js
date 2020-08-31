const Command = require('../../structures/command')

module.exports = class banComand extends Command {
    constructor(client) {
        super(client, {
            name: "anunciar",
            aliases: ['announce', 'anuncio'],
            category: 'util'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("você não tem permissão para executar este comando!")

        let channel = message.mentions.channels.first()
        let announce = args.slice(1).join(" ")

        if(!channel) return message.reply("digite o canal na qual você quer anunciar!");
        try {
            channel.send(announce)
            message.reply(`sua mensagem foi anunciada para o canal ${channel} com sucesso!`)
        } catch (err) {
            message.reply(`Erro: ${err}`)
        }
    }
}