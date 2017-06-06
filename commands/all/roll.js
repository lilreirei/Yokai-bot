var Nf = new Intl.NumberFormat('en-US');

module.exports = {
    desc: "Roll a number between the given range.",
    usage: "[[min-]max]",
    cooldown: 2,
    aliases: ['random'],
    task(bot, msg, suffix) {
        let args = suffix.match(/(?:(\d+)-)?(\d+)/);
        let roll = args === null ?
            [1, 10] :
            [parseInt(args[1]) || 1, parseInt(args[2])];
        bot.createMessage(msg.channel.id, `${msg.author.username} rolled **${Nf.format(roll[0])}-${Nf.format(roll[1])}** and got **${Nf.format(~~((Math.random() * (roll[1] - roll[0] + 1)) + roll[0]))}**`).catch(err => {
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