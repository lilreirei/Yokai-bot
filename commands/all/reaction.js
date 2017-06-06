module.exports = {
    desc: "Add a reaction to the provided message id. (Custom emotes do NOT work yet.)",
    usage: "<messageID> | <:emote:> (Custom emotes do NOT work yet.)",
    cooldown: 5,
    guildOnly: true,
    aliases: ['react'],
    task(bot, msg, args) {
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            msgid = array[0],
            emote = array[1];
        bot.addMessageReaction(msg.channel.id, msgid, emote).then(succ => {
            bot.deleteMessage(msg.channel.id, msg.id).catch(err => {
                return;
            });
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
};