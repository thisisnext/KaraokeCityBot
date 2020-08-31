const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/command')

module.exports = class banComand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ['banir', 'punir'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Você não tem permissão para executar este comando!");

        const bUser = message.guild.member(message.mentions.members.first() || args[0]);
        if(!bUser) return message.reply(`Não foi possível encontrar o usuário!`);

        const reason = args.slice(1).join(" ");
        if(!reason) reason = "Não definido.";

        const confirmEmbed = new MessageEmbed()
        .setTitle(`Deseja confirmar o banimento?`, true)
        .setThumbnail(bUser.user.displayAvatarURL())
        .addField("Punimento por", `<@${message.author.id}>`, true)
        .addField("Usuário punido", `${bUser}`, true)
        .addField("Motivo da punição", `${reason}`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();
        message.reply(confirmEmbed).then(async msg => {
            await msg.react('✅')
            await msg.react('🚫')

            const confirmFilter = (r, u) => r.emoji.name === '✅' && u.id === message.author.id;
            const cancelFilter = (r, u) => r.emoji.name ===  '🚫' && u.id === message.author.id;

            const confirm = msg.createReactionCollector(confirmFilter, { time: 60000 });
            const cancel = msg.createReactionCollector(cancelFilter, { time: 60000 })

            cancel.on('collect', r => {
                confirm.stop();
                r.users.remove(message.author);
                msg.delete();

                cancel.stop();
                return message.reply("Punição cancelada com sucesso!")
            })

            confirm.on('collect', async r => {
                const banEmbedDM = new MessageEmbed()
                .setTitle(`Você foi banido!`, true)
                .setThumbnail(message.guild.iconURL())
                .addField("Motivo da punição:", reason, true)
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                .setTimestamp();

                const banEmbed = new MessageEmbed()
                .setDescription("Usuário banido!")
                .setThumbnail(bUser.user.displayAvatarURL())
                .addField("Membro punido:", `${bUser}`, true)
                .addField("Punido por:", message.author, true)
                .addField("Motivo da punição:", reason, true)
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                .setTimestamp();

                const punchannel = message.guild.channels.cache.find(ch => ch.name === "punições")
                if(!punchannel) {
                    message.reply("Não foi possível encontrar o canal de punições, desde então, estarei enviando a embed aqui.")
                    message.channel.send(banEmbed)
                }
                bUser.send(banEmbedDM)

                try {
                    msg.delete();
                    
                    await message.guild.members.ban(bUser, { reason: reason })
                    await message.reply(`O usuário foi banido com sucesso!`);

                    if(punchannel) {
                        punchannel.send(banEmbed)
                    }
                } catch (err) {
                    message.reply(`Não foi possível banir o usuário devido ao erro: ${err}`);
                }
            })
        })
    }
}