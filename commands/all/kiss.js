const request = require('request-promise');
const kiss = require('../../kiss.json');
var randomItem = require('random-item');

module.exports = {
    desc: "Kiss someone.",
    usage: "<username | ID | @username>",
    aliases: ['kisses', 'kissu'],
    cooldown: 2,
    guildOnly: true,
    task(bot, msg, args) {
        const user = this.findMember(msg, args);
        const gif = randomItem(kiss);
        if (!args) return 'wrong usage';
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
        if (!gif) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xff0000,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Sowwy I couldn't find a gif for you :(`,
                fields: [{
                    name: `For support join:`,
                    value: `https://discord.gg/Vf4ne5b`,
                    inline: true
                }]
            }
        }).catch(err => {
            return;
        });
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `<@${msg.author.id}> **kisses** <@${user.id}>`,
                image: {
                    url: `${gif}`
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
    }
}