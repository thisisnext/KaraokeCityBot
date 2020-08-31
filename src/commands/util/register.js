const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "register",
            aliases: ['registrar'],
            category: 'util'
        })
    }
    
    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("sem permissão!");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Não tenho permissão de Gerenciar Cargos!")

        const member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
        if (!member) return message.reply("Mencione um usuário!")

        if (args.length < 2) return message.reply("Mencione ao menos 1 cargo.")

        let rolesID = [];

        for (let i = 1; i < args.length; i++) {
            let roleID = args[i];
            roleID = roleID.split("<").join("").split("@").join("").split("&").join("").split(">").join("")

            let role = message.guild.roles.cache.get(roleID);
            if (role) {
                rolesID.push(role.id)
            }
        }

        try {

            await member.roles.add(rolesID)
            message.reply("Cargos adicionados com sucesso!");

            let rolesName = '';
            for (let i = 0; i < rolesID.length; i++) {
                let r = message.guild.roles.cache.get(rolesID[i])
                rolesName += `${r.name}, `
            }

            const emoji = this.client.emojis.cache.get("748913959209271356")
            const embed = new MessageEmbed()
            .setColor("#FF4500")
            .setAuthor(`${member.user.tag} foi registrado!`, "https://cdn.discordapp.com/attachments/748361942615457794/748922942100078693/556352393244049409.png")
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**Usuário registrado:** ${member}\n**Moderador de registro:** ${message.author}\n**Servidor:** ${message.guild.name}\n`)
            .addField(`**Cargos recebidos:** `, `${rolesName}`)
            .setFooter('Sitema registro - KaraokêCity')

            let channel = message.guild.channels.cache.find(ch => ch.name === "registro-logs");
            if (!channel) return message.reply("Não foi possível encontrar o canal `registro-logs`**");
            await channel.send(embed)
            await member.send(embed)

        } catch (err) {
            console.error(err.stack)
        }
    }
}