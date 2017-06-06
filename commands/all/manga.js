const reload = require('require-reload'),
    config = reload('../../config.json');
const AniListAPI = require('anilist-api-pt');
var client_id = `${config.anilist_clientID}`,
    client_secret = `${config.anilist_clientSecret}`;
const anilistApi = new AniListAPI({ client_id, client_secret });

module.exports = {
    desc: "Shows info about an manga.",
    usage: "<Manga Name>",
    cooldown: 10,
    task(bot, msg, args) {
        if (!args) {
            return 'wrong usage';
        } else {
            anilistApi.auth().then(ani => {
                ani.manga.searchManga(`${args}`).then(function(results) {
                    var index = results.map(function(title) { return title.title_romaji; }).indexOf(args);
                    var manga = '';
                    if (index >= 0) {
                        index = results.map(function(title) { return title.title_romaji; }).indexOf(args);
                        manga = results[index];
                        var genre = manga.genres.toString();
                        var genres = genre.split(/, ?/).join(', ');
                        let embed = {
                            color: 0xf4ce11,
                            type: `rich`,
                            author: {
                                name: `${manga.title_romaji}`,
                                icon_url: ``
                            },
                            description: `${manga.description}`,
                            url: `${manga.image_url_lge}`,
                            image: {
                                url: `${manga.image_url_lge}`
                            },
                            fields: [{
                                    name: `Type`,
                                    value: `${manga.type}`,
                                    inline: true
                                },
                                {
                                    name: `Total Chapters`,
                                    value: `${manga.total_chapters}`,
                                    inline: true
                                },
                                {
                                    name: `Total Volumes`,
                                    value: `${manga.total_volumes}`,
                                    inline: true
                                },
                                {
                                    name: `Status`,
                                    value: `${manga.publishing_status}`,
                                    inline: true
                                },
                                {
                                    name: `Id`,
                                    value: `${manga.id}`,
                                    inline: true
                                },
                                {
                                    name: `18+`,
                                    value: `${manga.adult}`,
                                    inline: true
                                },
                                {
                                    name: `Average Score`,
                                    value: `${manga.average_score}`,
                                    inline: true
                                },
                                {
                                    name: `Popularity`,
                                    value: `${manga.popularity}`,
                                    inline: true
                                },
                                {
                                    name: `List Status`,
                                    value: `Completed: ${manga.list_stats.completed}
On Hold: ${manga.list_stats.on_hold}
Dropped: ${manga.list_stats.dropped}
Plan To Read: ${manga.list_stats.plan_to_read}
Reading: ${manga.list_stats.reading}`,
                                    inline: true
                                },
                                {
                                    name: `Alternative Titles`,
                                    value: `Romaji: ${manga.title_romaji}
English: ${manga.title_english}
Japanese: ${manga.title_japanese}`,
                                    inline: false
                                },
                                {
                                    name: `Genres`,
                                    value: `${genres}`,
                                    inline: false
                                }
                            ],
                            footer: {
                                icon_url: `https://b.catgirlsare.sexy/wj6g.png`,
                                text: `All information is provided by AniList`
                            }
                        }
                        bot.createMessage(msg.channel.id, { embed: embed }).catch(err => {
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
                    } else if (index < 0) {
                        var index2 = results.map(function(title) { return title.title_english; }).indexOf(args);
                        if (index2 >= 0) {
                            var index2 = results.map(function(title) { return title.title_english; }).indexOf(args);
                            manga = results[index2];
                            var genre = manga.genres.toString();
                            var genres = genre.split(/, ?/).join(', ');
                            let embed = {
                                color: 0xf4ce11,
                                type: `rich`,
                                author: {
                                    name: `${manga.title_romaji}`,
                                    icon_url: ``
                                },
                                description: `${manga.description}`,
                                url: `${manga.image_url_lge}`,
                                image: {
                                    url: `${manga.image_url_lge}`
                                },
                                fields: [{
                                        name: `Type`,
                                        value: `${manga.type}`,
                                        inline: true
                                    },
                                    {
                                        name: `Total Chapters`,
                                        value: `${manga.total_chapters}`,
                                        inline: true
                                    },
                                    {
                                        name: `Total Volumes`,
                                        value: `${manga.total_volumes}`,
                                        inline: true
                                    },
                                    {
                                        name: `Status`,
                                        value: `${manga.publishing_status}`,
                                        inline: true
                                    },
                                    {
                                        name: `Id`,
                                        value: `${manga.id}`,
                                        inline: true
                                    },
                                    {
                                        name: `18+`,
                                        value: `${manga.adult}`,
                                        inline: true
                                    },
                                    {
                                        name: `Average Score`,
                                        value: `${manga.average_score}`,
                                        inline: true
                                    },
                                    {
                                        name: `Popularity`,
                                        value: `${manga.popularity}`,
                                        inline: true
                                    },
                                    {
                                        name: `List Status`,
                                        value: `Completed: ${manga.list_stats.completed}
On Hold: ${manga.list_stats.on_hold}
Dropped: ${manga.list_stats.dropped}
Plan To Read: ${manga.list_stats.plan_to_read}
Reading: ${manga.list_stats.reading}`,
                                        inline: true
                                    },
                                    {
                                        name: `Alternative Titles`,
                                        value: `Romaji: ${manga.title_romaji}
English: ${manga.title_english}
Japanese: ${manga.title_japanese}`,
                                        inline: false
                                    },
                                    {
                                        name: `Genres`,
                                        value: `${genres}`,
                                        inline: false
                                    }
                                ],
                                footer: {
                                    icon_url: `https://b.catgirlsare.sexy/wj6g.png`,
                                    text: `All information is provided by AniList`
                                }
                            }
                            bot.createMessage(msg.channel.id, { embed: embed }).catch(err => {
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
                        } else if (index2 < 0) {
                            var index3 = 0;
                            manga = results[index3];
                            var genre = manga.genres.toString();
                            var genres = genre.split(/, ?/).join(', ');
                            let embed = {
                                color: 0xf4ce11,
                                type: `rich`,
                                author: {
                                    name: `${manga.title_romaji}`,
                                    icon_url: ``
                                },
                                description: `${manga.description}`,
                                url: `${manga.image_url_lge}`,
                                image: {
                                    url: `${manga.image_url_lge}`
                                },
                                fields: [{
                                        name: `Type`,
                                        value: `${manga.type}`,
                                        inline: true
                                    },
                                    {
                                        name: `Total Chapters`,
                                        value: `${manga.total_chapters}`,
                                        inline: true
                                    },
                                    {
                                        name: `Total Volumes`,
                                        value: `${manga.total_volumes}`,
                                        inline: true
                                    },
                                    {
                                        name: `Status`,
                                        value: `${manga.publishing_status}`,
                                        inline: true
                                    },
                                    {
                                        name: `Id`,
                                        value: `${manga.id}`,
                                        inline: true
                                    },
                                    {
                                        name: `18+`,
                                        value: `${manga.adult}`,
                                        inline: true
                                    },
                                    {
                                        name: `Average Score`,
                                        value: `${manga.average_score}`,
                                        inline: true
                                    },
                                    {
                                        name: `Popularity`,
                                        value: `${manga.popularity}`,
                                        inline: true
                                    },
                                    {
                                        name: `List Status`,
                                        value: `Completed: ${manga.list_stats.completed}
On Hold: ${manga.list_stats.on_hold}
Dropped: ${manga.list_stats.dropped}
Plan To Read: ${manga.list_stats.plan_to_read}
Reading: ${manga.list_stats.reading}`,
                                        inline: true
                                    },
                                    {
                                        name: `Alternative Titles`,
                                        value: `Romaji: ${manga.title_romaji}
English: ${manga.title_english}
Japanese: ${manga.title_japanese}`,
                                        inline: false
                                    },
                                    {
                                        name: `Genres`,
                                        value: `${genres}`,
                                        inline: false
                                    }
                                ],
                                footer: {
                                    icon_url: `https://b.catgirlsare.sexy/wj6g.png`,
                                    text: `All information is provided by AniList`
                                }
                            }
                            bot.createMessage(msg.channel.id, { embed: embed }).catch(err => {
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
            })
        }
    }
};