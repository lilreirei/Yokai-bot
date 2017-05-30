const OwnerId = require('../../config.json').adminIds[0];
const moment = require('../../node_modules/moment');

module.exports = {
    desc: "Send feedback or suggestion directly to my owner's(${kurozero}#0569) DMs without having to join the support server.\nDo NOT use this for any useless trolls/memes!!",
    usage: "<feedback/suggestion>",
    aliases: ['feedback', 'report', 'bug'],
    cooldown: 3600,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        bot.getDMChannel(OwnerId).then(dmchannel => {
            const time = Date.now();
            const owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);
            const user = msg.author;
            dmchannel.createMessage({
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Report from: ${msg.member.user.username}#${msg.member.user.discriminator} (${msg.member.user.id})`,
                        icon_url: `${user.avatarURL}`
                    },
                    description: ``,
                    fields: [{
                            name: `Timestamp`,
                            value: `${moment(time).utc(+2).format('ddd MMM DD YYYY | kk:mm:ss')} UTC+2`,
                            inline: true
                        },
                        {
                            name: `Owner`,
                            value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`,
                            inline: true
                        },
                        {
                            name: `Guild ID`,
                            value: `${msg.channel.guild.id}`,
                            inline: false
                        },
                        {
                            name: `Channel ID`,
                            value: `${msg.channel.id}`,
                            inline: false
                        },
                        {
                            name: `Report`,
                            value: `${args}`,
                            inline: false
                        }
                    ]
                }
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
            });
            bot.createMessage(msg.channel.id, `:white_check_mark: Successfully send your feedback/suggestion.`);
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
        });
    }
};