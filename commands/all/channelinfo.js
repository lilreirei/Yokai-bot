moment = require('../../node_modules/moment');

module.exports = {
        desc: "Shows info of the channel this command is used in. (only text channels for now)",
        aliases: ['ci', 'cinfo', 'channel'],
        cooldown: 5,
        guildOnly: true,
        task(bot, msg) {
            var afkTimer = msg.channel.guild.afkTimeout / 60;
            var owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);
            bot.createMessage(msg.channel.id, {
                        content: ``,
                        embed: {
                            color: 0xf4ce11,
                            type: 'rich',
                            author: {
                                name: `Channel info of ${msg.channel.name === null ? `` : ''}${msg.channel.name !== null ? msg.channel.name : ''}`,
                    icon_url: ``
                },
                description: `ID: ${msg.channel.id}`,
                thumbnail: {
                    url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
                },
                fields: [{
                        name: `Guild:`,
                        value: `${msg.channel.guild.name === null ? `` : ''}${msg.channel.guild.name !== null ? msg.channel.guild.name : ''}`,
                        inline: true
                    },
                    {
                        name: `Name:`,
                        value: `${msg.channel.mention === null ? `` : ''}${msg.channel.mention !== null ? msg.channel.mention : ''}`,
                        inline: true
                    },
                    {
                        name: `Position:`,
                        value: `${msg.channel.position === null ? `` : ''}${msg.channel.position !== null ? msg.channel.position : ''}`,
                        inline: true
                    },
                    {
                        name: `Topic:`,
                        value: `${msg.channel.topic === null ? `None` : ''}${msg.channel.topic !== null ? msg.channel.topic : ''}`,
                        inline: true
                    },
                    {
                        name: `Created On:`,
                        value: `${moment(msg.channel.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.channel.createdAt).fromNow()})`
                    },
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
    }
};