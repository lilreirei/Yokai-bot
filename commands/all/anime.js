var Anime = require('malapi').Anime;

module.exports = {
    desc: "Shows info about an anime.",
    usage: "<Anime Name>",
    cooldown: 10,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        Anime.fromName(args).then(anime => {
            var genre = anime.genres.toString();
            var genres = genre.split(/, ?/).join(', ');
            let embed = {
                color: 0xf4ce11,
                type: `rich`,
                author: {
                    name: `${anime.title}`,
                    icon_url: ``
                },
                description: `${anime.synopsis.split("\r")[0]}`,
                url: `${anime.detailsLink}`,
                image: {
                    url: `${anime.image}`
                },
                fields: [{
                        name: `Type`,
                        value: `${anime.type}`,
                        inline: true
                    },
                    {
                        name: `Episodes`,
                        value: `${anime.episodes}`,
                        inline: true
                    },
                    {
                        name: `Status`,
                        value: `${anime.status}`,
                        inline: true
                    },
                    {
                        name: `Score`,
                        value: `${anime.statistics.score.value}`,
                        inline: true
                    },
                    {
                        name: `Ranking`,
                        value: `${anime.statistics.ranking}`,
                        inline: true
                    },
                    {
                        name: `Favorites`,
                        value: `${anime.statistics.favorites}`,
                        inline: true
                    },
                    {
                        name: `Aired`,
                        value: `${anime.aired}`,
                        inline: false
                    },
                    {
                        name: `Genres`,
                        value: `${genres}`,
                        inline: false
                    },
                    {
                        name: `Alternative titles`,
                        value: `${anime.alternativeTitles.english}
${anime.alternativeTitles.japanese}`,
                        inline: false
                    }
                ],
                footer: {
                    icon_url: `https://b.catgirlsare.sexy/Jxmy.png`,
                    text: `All information is provided by My Anime List`
                }
            }
            bot.createMessage(msg.channel.id, {
                embed: embed
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