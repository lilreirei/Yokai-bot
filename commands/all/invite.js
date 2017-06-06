module.exports = {
    desc: "The link to add me to a server.",
    aliases: ['oauth'],
    cooldown: 5,
    task(bot, msg, _, config) {
        if (config.inviteLink)
            bot.createMessage(msg.channel.id, `Use this to add me to a server: ${config.inviteLink}\nMake sure you are logged in`).catch(err => {
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
        else
            bot.createMessage(msg.channel.id, 'No invite link defined').catch(err => {
                return;
            });
    }
};