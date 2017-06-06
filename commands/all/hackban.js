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
            const permcheck = msg.channel.guild.members.get(bot.user.id).permission.json.banMembers;
            if (permcheck === false) return bot.createMessage(msg.channel.id, 'I need the banMembers permission for this...').catch(err => {
                return;
            });
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
            }).catch(err => {
                return;
            });
        }
    }
};