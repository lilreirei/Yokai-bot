const RESPONSES = [
    "pong",
    "It's not like I wanted to say pong or anything b-baka!",
    "pong!",
    "what!?",
    "E-ehh pong?",
    "No..."
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
    desc: "Responds with pong.",
    help: "Used to check if the bot is working.\nReplies with 'pong' and the response delay.",
    aliases: ['p'],
    cooldown: 2,
    task(bot, msg) {
        let choice = ~~(Math.random() * RESPONSES.length);

        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: `${RESPONSES[choice]}`,
                    icon_url: ``
                },
                description: ``
            }
        }).then(sentMsg => {
            bot.editMessage(msg.channel.id, sentMsg.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${RESPONSES[choice]}`,
                        icon_url: ``
                    },
                    description: `Took me ${Nf.format(sentMsg.timestamp - msg.timestamp)}ms`
                }
            })
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