moment = require('../../node_modules/moment');

module.exports = {
    desc: "Shows info, roles or emotes of the guild it's used in.",
    usage: "<info/roles/emotes>",
    aliases: ['server'],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        args = args.toString();
        args = args.toLowerCase();
        if (args === 'info') {
            const afkTimer = msg.channel.guild.afkTimeout / 60,
                owner = msg.channel.guild.members.get(msg.channel.guild.ownerID),
                roles = msg.channel.guild.roles.map(c => c).length,
                emotes = msg.channel.guild.emojis.length,
                guildRegion = msg.channel.guild.region,
                afkChanID = msg.channel.guild.afkChannelID,
                createdOn = moment(msg.channel.guild.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss') + ' UTC ' + '(' + moment(msg.channel.guild.createdAt).fromNow() + ')',
                verificationLevel = msg.channel.guild.verificationLevel,
                defChan = msg.channel.guild.defaultChannel,
                total = msg.channel.guild.memberCount,
                bots = msg.channel.guild.members.filter(user => user.user.bot).length,
                humans = total - bots,
                humanper = humans / total * 100,
                botper = bots / total * 100;
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: 'rich',
                    author: {
                        name: `Guild info of ${msg.channel.guild.name === null ? `` : ''}${msg.channel.guild.name !== null ? msg.channel.guild.name : ''}`,
                        icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
                    },
                    description: ``,
                    thumbnail: {
                        url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
                    },
                    fields: [{
                            name: `Total Members:`,
                            value: `${total === null ? `n/a` : ''}${total !== null ? total : ''}`,
                            inline: false
                        },
                        {
                            name: `Bots:`,
                            value: `${bots === null ? `n/a` : ''}${bots !== null ? bots : ''}, ${botper === null ? `` : ''}${botper !== null ? this.round(botper, 2)+'%' : ''}`,
                            inline: true
                        },
                        {
                            name: `Humans:`,
                            value: `${humans === null ? `n/a` : ''}${humans !== null ? humans : ''}, ${humanper === null ? `` : ''}${humanper !== null ? this.round(humanper, 2)+'%' : ''}`,
                            inline: true
                        },
                        {
                            name: `Default Channel:`,
                            value: `${defChan === null ? `n/a` : ''}${defChan !== null ? defChan.mention : ''}`,
                            inline: true
                        },
                        {
                            name: `Guild Region:`,
                            value: `${guildRegion === null ? `n/a` : ''}${guildRegion !== null ? guildRegion : ''}`,
                            inline: true
                        },
                        {
                            name: `Guild ID:`,
                            value: `${msg.channel.guild.id}`,
                            inline: true
                        },
                        {
                            name: `Verification Level:`,
                            value: `${verificationLevel === null ? `n/a` : ''}${verificationLevel !== null ? verificationLevel : ''}`,
                            inline: true
                        },
                        {
                            name: `AFK Timeout:`,
                            value: `${afkTimer === null ? `n/a` : ''}${afkTimer !== null ? afkTimer+'min' : ''}`,
                            inline: true
                        },
                        {
                            name: `AFK Channel:`,
                            value: `${afkChanID === null ? `n/a` : ''}${afkChanID !== null ? '<#'+afkChanID+'>' : ''}`,
                            inline: true
                        },
                        {
                            name: `Created On:`,
                            value: `${createdOn === null ? `n/a` : ''}${createdOn !== null ? createdOn : ''}`
                        },
                        {
                            name: `Guild Owner:`,
                            value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`
                        },
                        {
                            name: `Roles:`,
                            value: `${roles === null ? `n/a` : ''}${roles !== null ? roles : ''}`,
                            inline: true
                        },
                        {
                            name: `Emotes:`,
                            value: `${emotes === null ? `n/a` : ''}${emotes !== null ? emotes : ''}`,
                            inline: true
                        }
                    ]
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
        } else if (args === 'roles') {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `All guild roles:`,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${msg.channel.guild.roles.map(c => c.name).join(', ')}`
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
        } else if (args === 'emotes') {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `All guild emotes:`,
                        url: ``,
                        icon_url: ``
                    },
                    description: `<:${msg.channel.guild.emojis.map(c => c.name + ":" + c.id).join('> <:')}>`
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
        } else {
            return 'wrong usage';
        }
    }
};