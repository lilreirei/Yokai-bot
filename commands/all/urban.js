const urban = require('relevant-urban');

module.exports = {
    desc: "Search for a definition on urban dictionary.",
    usage: "<word> (or nothing for random)",
    aliases: [],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, suffix) {
        if (!suffix) return urban.random().then(def => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: `rich`,
                    author: {
                        name: `${def.word}`,
                        icon_url: ``
                    },
                    description: `${def.definition}`,
                    url: `${def.urbanURL}`,
                    thumbnail: {
                        url: `https://b.catgirlsare.sexy/KAFl.jpg`
                    },
                    fields: [{
                            name: `Example:`,
                            value: `${def.example}`,
                            inline: true
                        },
                        {
                            name: `Author:`,
                            value: `${def.author}`,
                            inline: false
                        },
                        {
                            name: `ThumbsUp:`,
                            value: `\\👍 ${def.thumbsUp}`,
                            inline: true
                        },
                        {
                            name: `ThumbsDown`,
                            value: `\\👎 ${def.thumbsDown}`,
                            inline: true
                        }
                    ],
                    footer: {
                        icon_url: ``,
                        text: `All information is provided by urban dictionary`
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
            });
        }).catch(err => {
            return;
        });
        urban.random(suffix).then(def => {
            const tags = def.tags.join(', ');
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: `rich`,
                    author: {
                        name: `${def.word}`,
                        icon_url: ``
                    },
                    description: `${def.definition}`,
                    url: `${def.urbanURL}`,
                    thumbnail: {
                        url: `https://b.catgirlsare.sexy/KAFl.jpg`
                    },
                    fields: [{
                            name: `Example:`,
                            value: `${def.example}`,
                            inline: true
                        },
                        {
                            name: `Author:`,
                            value: `${def.author}`,
                            inline: false
                        },
                        {
                            name: `ThumbsUp:`,
                            value: `\\👍 ${def.thumbsUp}`,
                            inline: true
                        },
                        {
                            name: `ThumbsDown`,
                            value: `\\👎 ${def.thumbsDown}`,
                            inline: true
                        },
                        {
                            name: `Tags:`,
                            value: `${tags}`,
                            inline: false
                        }
                    ],
                    footer: {
                        icon_url: ``,
                        text: `All information is provided by urban dictionary`
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
            });
        }).catch(err => {
            return;
        });
    }
};