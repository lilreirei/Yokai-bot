module.exports = {
    desc: "Sends the latest changelog from the support server.",
    usage: "",
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, suffix, channel) {
        let c_ = bot.getChannel('240154536856125440')

        c_.getMessages(0).then(function(value) {
            let embed = {
                color: 0xf4ce11,
                author: {
                    name: 'Latest changelog:',
                    icon_url: 'https://b.catgirlsare.sexy/kMDk.jpg'
                },
                description: `${value[0].content}`
            }
            bot.createMessage(msg.channel.id, {
                embed: embed
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
        }).catch(err => {
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
        })
    }
};