const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ['ajuda'],
            category: 'util'
        })
    }
    async run(message) {
        message.delete();
        
        let helpEmbed = new MessageEmbed()
        .setAuthor(`KaraokêBOT - Ajuda`)
        .setThumbnail(message.guild.iconURL())
        .setDescription("Para saber meus comandos, reaja ao emoji de cada categoria.\nComandos de Moderação: 🔧\nComandos de Utilidade: ⭐")
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();

        let modCategoryEmbed = new MessageEmbed()
        .setAuthor(`KaraokêBOT - Ajuda | Moderação`)
        .setThumbnail(message.guild.iconURL())
        .addField("Comandos: ", this.client.commands.filter(c => c.config.category === "mod").map(c => `kc!${c.config.name}`).join(',\n '))
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();

        let utilCategoryEmbed = new MessageEmbed()
        .setAuthor(`KaraokêBOT - Ajuda | Utilidade`)
        .setThumbnail(message.guild.iconURL())
        .addField("Comandos: ", this.client.commands.filter(c => c.config.category === "util").map(c => `kc!${c.config.name}`).join(',\n '))
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();

        await message.channel.send(helpEmbed).then(async msg => {
            await msg.react('◀️')
            await msg.react('🔧')
            await msg.react('⭐')

            const filter = (r, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(filter, { time: 120000 })

            collector.on("collect", async r => {
                r.users.remove(message.author);

                if(r.emoji.name === "🔧") {

                    try {
                        msg.edit(modCategoryEmbed)
                    } catch (err) {
                        console.error(err.stack)
                    }

                }
                if(r.emoji.name === "⭐") {

                    try {
                        msg.edit(utilCategoryEmbed)
                    } catch (err) {
                        console.error(err.stack)
                    }

                }
                if(r.emoji.name === "◀️") {

                    try {
                        msg.edit(helpEmbed)
                    } catch (err) {
                        console.error(err.stack)
                    }

                }
            })
        })
    }
}