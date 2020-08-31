const Command = require('../../structures/command');

module.exports = class unbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            aliases: ['desbanir'],
            category: 'mod'
        })
    }
    
    async run(message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Você não tem permissão para executar este comando!")

        const bUser = args[0];
        if(!bUser) return message.reply(`Não foi possível encontrar o usuário!`);

        await message.guild.members.unban(bUser).then(async () => {
            await message.reply(`O usuário foi desbanido com sucesso!`)
        }).catch(err => {
            message.reply(`Ocorreu um erro: ${err}`);
        })
    }
} 