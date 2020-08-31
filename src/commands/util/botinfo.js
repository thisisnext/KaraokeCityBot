const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/command');
const moment = require('moment')
moment.locale('pt-br')

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
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

        const days = Math.floor(this.client.uptime / 86400000);
        const hours = Math.floor(this.client.uptime / 3600000) % 24;
        const minutes = Math.floor(this.client.uptime / 60000) % 60;
        const seconds = Math.floor(this.client.uptime / 1000) % 60;

        const embed = new MessageEmbed()
        .setAuthor("Minhas Informações")
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField("**Meu nick:**", this.client.user.username)
        .addField("**Meu ID:**", this.client.user.id)
        .addField("**Servidores:**", this.client.guilds.cache.size, true)
        .addField("**Estou online há:**", `${days} dias, ${hours} horas, ${minutes} minutos, e ${seconds} segundos.`)
        .addField('Meu nome é KaraokêBOT', 'Como você está? Eu fui criado e desenvolvido para a sua segurança e diversão desse servidor maravilhoso. Espero que goste de mim!')
        .setFooter(`2020 © ${this.client.user.username}.`)
        .setTimestamp();
        message.channel.send(embed);
    }
}