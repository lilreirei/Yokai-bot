ddg = require('ddg');

module.exports = {
    desc: "Gets top 4 results from duckduckgo.",
    usage: "<Text_to_search>",
    aliases: ['ddg'],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        ddg.query(`${args}`, function(err, data) {
            // Topic 1
            var topic1URL = '';
            var topic1Text = '';
            if (data.RelatedTopics[0] === undefined) {
                topic1URL = 'n/a';
                topic1Text = 'n/a';
            } else {
                topic1URL = data.RelatedTopics[0].FirstURL;
                topic1Text = data.RelatedTopics[0].Text;
            }
            // Topic 2
            var topic2URL = '';
            var topic2Text = '';
            if (data.RelatedTopics[1] === undefined) {
                topic2URL = 'n/a';
                topic2Text = 'n/a';
            } else {
                topic2URL = data.RelatedTopics[1].FirstURL;
                topic2Text = data.RelatedTopics[1].Text;
            }
            // Topic 3
            var topic3URL = '';
            var topic3Text = '';
            if (data.RelatedTopics[2] === undefined) {
                topic3URL = 'n/a';
                topic3Text = 'n/a';
            } else {
                topic3URL = data.RelatedTopics[2].FirstURL;
                topic3Text = data.RelatedTopics[2].Text;
            }
            // Topic 4
            var topic4URL = '';
            var topic4Text = '';
            if (data.RelatedTopics[3] === undefined) {
                topic4URL = 'n/a';
                topic4Text = 'n/a';
            } else {
                topic4URL = data.RelatedTopics[3].FirstURL;
                topic4Text = data.RelatedTopics[3].Text;
            }
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Top 4 results:`,
                        url: ``,
                        icon_url: ``
                    },
                    thumbnail: {
                        url: `https://b.catgirlsare.sexy/o1Ih.png`
                    },
                    description: ``,
                    fields: [{
                            name: `Topic 1`,
                            value: `${topic1URL}
${topic1Text}`,
                            inline: false
                        },
                        {
                            name: `Topic 2`,
                            value: `${topic2URL}
${topic2Text}`,
                            inline: false
                        },
                        {
                            name: `Topic 3`,
                            value: `${topic3URL}
${topic3Text}`,
                            inline: false
                        },
                        {
                            name: `Topic 4`,
                            value: `${topic4URL}
${topic4Text}`,
                            inline: false
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
        });
    }
};