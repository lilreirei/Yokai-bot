const pornsearch = require('pornsearch');
var reload = require('require-reload'),
    banned = reload('../../banned_search_terms.json');

module.exports = {
    desc: "Search for gifs from pornhub.com and sex.com",
    usage: "<tag(s)>",
    aliases: [],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, suffix, config, settingsManager) {
        var nsfw = settingsManager.getNSFW(msg.channel.guild.id, msg.channel.id);
        if (!nsfw) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `You can only use this command in an **nsfw** channels, use \`s$settings nsfw <allow/deny>\`.`
            }
        }).catch(err => {
            return;
        });
        if (!suffix) return 'wrong usage';
        var bannedWord1 = banned.bannedWords[0];
        var bannedWord2 = banned.bannedWords[1];
        var bannedWord3 = banned.bannedWords[2];
        var bannedWord4 = banned.bannedWords[3];
        if (suffix.includes(bannedWord1) || suffix.includes(bannedWord2) || suffix.includes(bannedWord3) || suffix.includes(bannedWord4)) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Sorry it's against Discord's ToS to search for these tags.`
            }
        }).catch(err => {
            return;
        });
        let items = ['pornhub', 'sex'];
        let item = items[Math.floor(Math.random() * items.length)];
        let nums = [1, 2, 3, 4, 5];
        let num = nums[Math.floor(Math.random() * nums.length)];
        const pornsite = pornsearch.load(item);
        pornsite.gifs(suffix).then((response) => {
            if (!response) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find anything using those tags.`
                }
            }).catch(err => {
                return;
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${response[num].title}`,
                        url: `${response[num].url}`,
                        icon_url: ``
                    },
                    description: `[Direct Image Url](${response[num].url})`,
                    image: {
                        url: `${response[num].url}`
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
            }).catch(err => {
                return;
            });
        });
    }
};