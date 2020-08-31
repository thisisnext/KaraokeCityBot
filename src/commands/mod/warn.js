const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class warnCommand extends Command {
    constructor(client) {
        super(client, {
            name: "warn",
            aliases: ['avisar', 'advertir'],
            category: 'mod'
        })
    }

    async run(message, args) {
        const wUser = message.guild.member(message.mentions.members.first()) || args[0];
        const reason = args.slice(1).join(" ")

        const warnEmbedDM = new MessageEmbed()
        .setTitle("Você foi advertido!")
        .setThumbnail(message.guild.iconURL())
        .addField(`Motivo da advertência:`, reason, true)
        .addField(`Advertido por:`, message.author, true)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();

        const warnEmbed = new MessageEmbed()
        .setTitle("Usuário advertido!")
        .setThumbnail(message.guild.iconURL())
        .addField("Membro punido:", `${wUser}`, true)
        .addField("Punido por:", message.author, true)
        .addField("Motivo da punição:", reason, true)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();

        const punchannel = message.guild.channels.cache.find(ch => ch.name === "raid")
        if(!punchannel) {
            message.reply("Não foi possível encontrar o canal de punições, desde então, estarei enviando a embed aqui.")
            message.channel.send(warnEmbed)
        }

        try {
            
            wUser.send(warnEmbedDM);
            await message.reply(`O usuário foi advertido com sucesso!`);

            if(punchannel) {
                punchannel.send(warnEmbed)
            }
        } catch (err) {
            message.reply(`Não foi possível advertir o usuário devido ao erro: ${err}`);
        }
    }
}