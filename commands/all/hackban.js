module.exports = {
    desc: "Ban a user that is not in the guild.",
    usage: "<user_id> | <reason>",
    guildOnly: true,
    requiredPermission: 'banMembers',
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            userToBan = array[0],
            reason = array[1];
        const deletedays = 7;
        const strlength = /^\d{17,18}/.test(userToBan);
        const isnum = /^\d+$/.test(userToBan);
        if (isnum === true && strlength === true) {
            msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
            bot.banGuildMember(msg.channel.guild.id, userToBan, deletedays, reason).catch(err => {
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
                        description: `Can't ban <@${userToBan}>, privilege is too low.`
                    }
                })
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
            });
        } else {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `The given ID is invalid, make sure you used a correct userID.`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
        }
    }
};