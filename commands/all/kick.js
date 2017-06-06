module.exports = {
    desc: "Kick the mentioned member.",
    usage: "<username/ID/@username> | <reason>",
    guildOnly: true,
    requiredPermission: 'kickMembers',
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            userToKick = array[0],
            reason = array[1];
        const user = this.findMember(msg, userToKick);
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
        const permcheck = msg.channel.guild.members.get(bot.user.id).permission.json.kickMembers;
        if (permcheck === false) return bot.createMessage(msg.channel.id, 'I need the kickMembers permission for this...').catch(err => {
            return;
        });
        bot.kickGuildMember(msg.channel.guild.id, user.id, reason).catch(err => {
            var string = `${err}`,
                substring = 'Privilege is too low...';
            if (string.includes(substring)) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Can't kick <@${user.id}>, privilege is too low.`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            }).catch(err => {
                return;
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            }).catch(err => {
                return;
            });
        });
    }
};