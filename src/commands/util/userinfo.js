const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
moment.locale('pt-br')

module.exports = class userInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "userinfo",
            aliases: ['user-info'],
            category: 'util'
        })
    }
    async run(message, args) {
        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);
        if(!membro) return message.reply("Usuário não encontrado.")

        let statusmembro;
        if(membro.presence.status === "dnd") statusmembro = "Ocupado";
        if(membro.presence.status === "idle") statusmembro = "Ausente";
        if(membro.presence.status === "stream") statusmembro = "Transmitindo";
        if(membro.presence.status === "offline") statusmembro = "Offline";
        if(membro.presence.status === "online") statusmembro = "Disponível";

        const lettersUC = (text) => {
            return text
              .toLowerCase().split(' ').map(word => word.charAt(0)
              .toUpperCase() + word.slice(1)).join(' ');
          }
          
          let joinedPoisiton = message.guild.members.cache.sorted((a, b) => a.joinedAt - b.joinedAt).array().findIndex(member => member.id === membro.id) + 1
          let boosterDate = membro.premiumSince !== null ? lettersUC(moment.utc(membro.premiumSinceTimestamp).format('LLLL')) : "Não está impulsionando.";

          let embed = new MessageEmbed()
          .setAuthor(`Membro ${membro.user.username}`, membro.user.displayAvatarURL())
          .addField("Posição de entrada:", `${joinedPoisiton}° membro á entrar no servidor.`)
          .addField("Data de entrada:", lettersUC(moment(membro.joinedAt).format('LLLL')))
          .addField("Data da Conta:", lettersUC(moment.utc(membro.user.createdAt).format('LLLL')))
          .addField("Tag de usuário:", membro.user.tag, true)
          .addField("Nickname", `${membro.nickname ? membro.nickname : 'Não possui nickname.'}`)
          .addField("ID de usuário:", membro.id)
          .addField("Status:", statusmembro)
          .addField("Tempo de impulsionamento: ", boosterDate)
          .setThumbnail(membro.user.displayAvatarURL())
          .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send(embed)
    }
}