const fs = require('fs');

module.exports = {
    desc: "Get your level and points.",
    aliases: ['lvl', 'points', 'profile', 'rank'],
    cooldown: 5,
    task(bot, msg, args) {
        if (!args) {
            let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));
            if (!points) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find your data.`
                }
            }).catch(err => {
                return;
            });
            let userData = points[msg.author.id];
            if (!userData) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Oh it looks like you do not have any points yet, better start talking and stop lurking boii.`
                }
            }).catch(err => {
                return;
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Profile of ${msg.author.username}`,
                        url: ``,
                        icon_url: ``
                    },
                    description: ``,
                    fields: [{
                            name: `Level`,
                            value: `${userData.level}`,
                            inline: true
                        },
                        {
                            name: `Points`,
                            value: `${userData.points}`,
                            inline: true
                        }
                    ]
                }
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
        } else {
            const user = this.findMember(msg, args)
            if (!user) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
                }
            }).catch(err => {
                return;
            });
            // const userID = msg.channel.guild.members.get(user.id);
            let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));
            if (!points) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find your data.`
                }
            }).catch(err => {
                return;
            });
            let userData = points[user.id];
            if (!userData) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Oh it looks like you do not have any points yet, better start talking and stop lurking boii.`
                }
            }).catch(err => {
                return;
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Profile of ${user.username}`,
                        url: ``,
                        icon_url: ``
                    },
                    description: ``,
                    fields: [{
                            name: `Level`,
                            value: `${userData.level}`,
                            inline: true
                        },
                        {
                            name: `Points`,
                            value: `${userData.points}`,
                            inline: true
                        }
                    ]
                }
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