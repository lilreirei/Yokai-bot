module.exports = {
    desc: "Sends a google link with the search term.",
    usage: "<Search terms>",
    aliases: ['google', 'srch'],
    cooldown: 2,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        let search = args.toString();
        search = encodeURIComponent(search.trim());
        bot.createMessage(msg.channel.id, `https://www.google.com/search?q=` + `${search}`).catch(err => {
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