const config = require('../config.json');

module.exports = class MessageEvent {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        let mention = [`<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
        mention.find(mention => {
            if (message.content === mention) {
                message.reply(`Olá! Meu prefixo é \`kc!\`. Utilize \`kc!help\` para ver minha ajuda.`);
            }
        });

        const prefix = [`${config.prefix}`, `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
        prefix.find(prefix => {
            try {
                const args = message.content.slice(prefix.length).trim().split(" ");

                if (message.content.startsWith(prefix)) {
                    let cmd = args.shift().toLowerCase();
                    const commandFile = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));

                    if (!commandFile) return;
                    if (commandFile.config.dev) {
                        if (!this.client.config.owners.some(owner => message.author.id === owner)) return message.reply("Somente para desenvolvedores.")
                    }

                    new Promise(res => {
                        res(commandFile.run(message, args));
                    }).catch(err => {
                        message.reply("Desculpe, um erro ocorreu.");
                        console.error(err.stack);
                    });
                }

            } catch (err) {
                console.error(err);
            }
        })
    }
}