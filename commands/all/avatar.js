module.exports = {
    desc: "Sends someone's avatar url. (The file size can be 128, 256, 512, 1024, or 2048. Defaults to 2048.)",
    usage: "<-s/--size> <size> OR <username/ID/@username> | <size>",
    aliases: ['ava', 'pfp', 'avi'],
    guildOnly: true,
    cooldown: 5,
    task(bot, msg, args) {
        let format = '';
        let size = 2048;
        if (!args) {
            // s.avatar
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Your Avatar:`,
                        url: `${msg.author.dynamicAvatarURL(format, size)}`,
                        icon_url: `${msg.author.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${msg.author.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${msg.author.dynamicAvatarURL(format, size)}`
                    }
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
        } else if ((args.startsWith('--size')) || (args.startsWith('-s'))) {
            // s.avatar -s <size> || s.avatar --size <size>
            const str = args + "";
            const array = str.split(' ');
            let int = array[1];
            size = parseInt(int);
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Your Avatar:`,
                        url: `${msg.author.dynamicAvatarURL(format, size)}`,
                        icon_url: `${msg.author.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${msg.author.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${msg.author.dynamicAvatarURL(format, size)}`
                    }
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
            // s.avatar <user> | <size>
            const str = args + "";
            const array = str.split(/ ?\| ?/);
            let member = array[0];
            let int = array[1];
            size = parseInt(int);
            if (!int)
                size = 2048;
            const user = this.findMember(msg, member);
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
            const id = msg.channel.guild.members.get(user.id);
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${id.username}'s Avatar:`,
                        url: `${user.dynamicAvatarURL(format, size)}`,
                        icon_url: `${user.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${user.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${user.dynamicAvatarURL(format, size)}`
                    }
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