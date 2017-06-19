var fs = require('fs');

module.exports = {
    desc: "Easy way for me to ban guilds.",
    usage: "<guildID>",
    aliases: ['banguild', 'blg', 'blguild'],
    cooldown: 5,
    hidden: true,
    ownerOnly: true,
    task(bot, msg, suffix) {
        bot.leaveGuild(suffix).then(() => {
            var obj = JSON.parse(fs.readFileSync(`./banned_guilds.json`, 'utf8'));
            obj['bannedGuildIds'].push(suffix);
            fs.writeFile(`./banned_guilds.json`, JSON.stringify(obj), (err) => {
                if (err) return bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `${err}`
                    }
                });
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `Guild added to the blacklist :black_heart:`
                    }
                });
            });
        }).catch(err => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`
                }
            });
        });
    }
};