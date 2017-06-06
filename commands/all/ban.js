module.exports = {
    desc: "Ban the mentioned member.",
    usage: "<username/ID/@username> | <reason>",
    guildOnly: true,
    requiredPermission: 'banMembers',
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            userToBan = array[0],
            reason = array[1];
        const user = this.findMember(msg, userToBan);
        const deletedays = 7;
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
        const permcheck = msg.channel.guild.members.get(bot.user.id).permission.json.banMembers;
        if (permcheck === false) return bot.createMessage(msg.channel.id, 'I need the banMembers permission for this...').catch(err => {
            return;
        });
        bot.banGuildMember(msg.channel.guild.id, user.id, deletedays, reason).catch(err => {
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
                    description: `Can't ban <@${user.id}>, privilege is too low.`
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
}