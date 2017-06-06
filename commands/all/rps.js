const RPS = [
    'rock',
    'paper',
    'scissors'
];

module.exports = {
    desc: "Play rps against shinobu",
    usage: "<rock|paper|scissors>",
    aliases: [],
    cooldown: 5,
    task(bot, msg, args) {
        let choice = ~~(Math.random() * RPS.length),
            chosen = RPS[choice];
        if (!args) {
            return 'wrong usage'
        }
        let user = args.toLowerCase();
        if (args === chosen) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: ${user}
			Shinobu: ${chosen}
			Rip it's a tied game...`
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
        } else if ((user === 'rock') && (chosen === 'scissors')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: rock
			Shinobu: scissors
			Rock beats scissors, you win`
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
        } else if ((user === 'rock') && (chosen === 'paper')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: rock
			Shinobu: paper
			Paper beats rock, shinobu wins`
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
        } else if ((user === 'paper') && (chosen === 'rock')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: paper
			Shinobu: rock
			Paper beats rock, you win`
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
        } else if ((user === 'paper') && (chosen === 'scissors')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: paper
			Shinobu: scissors
			Scissors beats paper, shinobu wins`
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
        } else if ((user === 'scissors') && (chosen === 'paper')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: scissors
			Shinobu: paper
			Scissor beats paper, you win`
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
        } else if ((user === 'scissors') && (chosen === 'rock')) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        icon_url: ``
                    },
                    description: `You: scissors
			Shinobu: rock
			Rock beats scissors, shinobu wins`
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
        }
    }
};