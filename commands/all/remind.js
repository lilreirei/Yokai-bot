const schedule = require('node-schedule');
const moment = require('moment');
const date = require('date.js');

module.exports = {
    desc: "Set a reminder for yourself or someone else.",
    usage: "<me/someone_else> | <reminder> | <time>",
    cooldown: 10,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        args = args.split(/ ?\| ?/);
        if (!args[0]) return 'wrong usage';
        if (!args[1]) return 'wrong usage';
        if (!args[2]) return 'wrong usage';
        const person = args[0];
        const reminder = args[1];
        const time = args[2];

        const newDate = date(time);
        if (newDate <= new Date()) {
            return bot.createMessage(msg.channel.id, 'that date doesn\'t seem to be valid.').catch(err => {
                return;
            });
        }

        schedule.scheduleJob(newDate, () => {
            if (person == 'me') {
                bot.createMessage(msg.channel.id, `${msg.author.mention}, I'm reminding you to **${reminder}**`).catch(err => {
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
                const user = this.findMember(msg, person)
                if (!user) return bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
                    }
                }).catch(err => {
                    return;
                });
                bot.createMessage(msg.channel.id, `${user.mention}, I'm reminding you to **${reminder}**`).catch(err => {
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
        });
        bot.createMessage(msg.channel.id, 'reminder set for ' + moment(newDate).format('dddd, MMMM Do YYYY, h:mm:ss a ZZ')).catch(err => {
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