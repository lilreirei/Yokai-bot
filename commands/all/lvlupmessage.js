const fs = require('fs');

module.exports = {
    desc: "Enable/disable the level up message.",
    usage: "<enable/disable>",
    aliases: ['lvlmsg', 'levelmsg', 'levelmessage'],
    cooldown: 5,
    guildOnly: true,
    requiredPermission: 'administrator',
    task(bot, msg, suffix) {
        if (!suffix) return 'wrong usage';
        const lower = suffix.toLowerCase();
        let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));

        if (suffix === 'enable') {
            message[msg.channel.guild.id] = {
                type: "true"
            };
            fs.writeFile(`./db/message.json`, JSON.stringify(message), (err) => {
                if (err) console.error(err)
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
                    description: `:white_check_mark: Level up message is now enabled!`
                },
            }).catch(err => {
                const error = JSON.parse(err.response);
                if (error.code === 50013) {
                    bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                        bot.getDMChannel(msg.author.id).then(dmchannel => {
                            dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                                return;
                            });
                        }).catch(err => {
                            return;
                        });
                    });
                } else {
                    bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                        return;
                    });
                }
            });
        } else if (suffix === 'disable') {
            message[msg.channel.guild.id] = {
                type: "false"
            };
            fs.writeFile(`./db/message.json`, JSON.stringify(message), (err) => {
                if (err) console.error(err)
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
                    description: `:white_check_mark: Level up message is now disabled!`
                },
            }).catch(err => {
                const error = JSON.parse(err.response);
                if (error.code === 50013) {
                    bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                        bot.getDMChannel(msg.author.id).then(dmchannel => {
                            dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                                return;
                            });
                        }).catch(err => {
                            return;
                        });
                    });
                } else {
                    bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                        return;
                    });
                }
            });
        }
    }
};