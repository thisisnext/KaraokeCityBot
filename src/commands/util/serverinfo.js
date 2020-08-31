const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: [],
            category: 'util'
        })
    }

    async run(message) {

        const lettersUC = (text) => {
            return text
              .toLowerCase().split(' ').map(word => word.charAt(0)
              .toUpperCase() + word.slice(1)).join(' ');
          }

        const embed = new MessageEmbed()
        .setAuthor("🔍 Informações do servidor")
        .addField("**Nome:**", message.guild.name, true)
        .addField("**ID:**", message.guild.id, true)
        .addField("**Dono:**", message.guild.owner, true)
        .addField("**Região:**", `${lettersUC(message.guild.region).replace('Brazil', 'Brasil')}`, true)
        .addField("**Humanos | Bots:**", `${message.guild.members.cache.filter(m => !m.user.bot).size} | ${message.guild.members.cache.filter(m => m.user.bot).size}`)
        .addField("**Canais**:", message.guild.channels.cache.size, true)
        .addField("**Cargos**:", message.guild.roles.cache.size, true)
        .addField("**Você entrou em:**", lettersUC(moment(message.member.joinedAt).format("LLLL")))
        .setThumbnail(message.guild.iconURL())
        .setFooter("© Karaokê City - 2020")
        .setTimestamp();

        message.channel.send(embed)
    }
}