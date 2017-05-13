module.exports = {
    desc: "Unban a member by id.",
    usage: "<user_id> | <reason>",
    guildOnly: true,
    requiredPermission: 'banMembers',
    task(bot, msg, suffix) {
        if (!suffix) return 'wrong usage'
        const str = suffix + "";
        const array = str.split(/ ?\| ?/),
            userToBan = array[0],
            reason = array[1];
        msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
        bot.unbanGuildMember(msg.channel.guild.id, userToBan, reason).catch(err => {
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
                    description: `Can't unban <@${userToBan}>, privilege is too low.`
                }
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
            });
        })
    }
}