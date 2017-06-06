const request = require('request-promise-native');

module.exports = {
    desc: "Sends a random boobs pic.",
    usage: "",
    aliases: [],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args, config, settingsManager) {
        const nsfw = settingsManager.getNSFW(msg.channel.guild.id, msg.channel.id);
        if (!nsfw) return bot.createMessage(msg.channel.id, 'You can only use this command in an **nsfw** channels, use \`s.settings nsfw <allow/deny>\`.');
        request.get(`http://api.oboobs.ru/boobs/0/1/random`)
            .then(JSON.parse)
            .then(res => {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: ``,
                        image: {
                            url: `http://media.oboobs.ru/${res[0].preview}`
                        }
                    }
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
            })
            .catch(err => {
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